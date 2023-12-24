const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const e = require("express");

// User Routes
router.post("/signup", async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username: username });
    console.log(existingUser);
    if (existingUser) {
        return res.status(400).json({
            message: "Can't signup, username already exists",
        });
    }

    const user = new User({
        username: username,
        password: password,
        purchasedCourses: [],
    });

    user.save()
        .then(() => {
            console.log("User saved");
            res.status(200).json({ message: "User created successfully" });
        })
        .catch((error) => {
            console.error("Error in saving user", error);
            res.status(500).json({ message: "Error Saving user" });
        });
});

router.get("/courses", userMiddleware, (req, res) => {
    // Implement listing all courses logic
    Course.find()
        .then((courses) => {
            const responseCourses = courses.map((course) => {
                return {
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    price: course.price,
                    imageLink: course.imageLink,
                    published: course.published,
                };
            });
            res.status(200).json({
                courses: responseCourses,
            });
        })
        .catch((error) => {
            console.error("Error in fetching courses", error);
            res.status(500).json({ message: "Error in fetching courses" });
        });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const user = await User.findOne({ username: username });
    user.purchasedCourses.push(courseId);

    user.save()
        .then(() => {
            console.log("updated user course");
            res.status(200).json({ message: "Course purchased successfully" });
        })
        .catch((error) => {
            console.error("Error in updating user coureses", error);
            res.status(500).json({
                message: "Error in updating user coureses",
            });
        });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    try {
        const user = await User.findOne({ username: username });
        const purchasedCourses = await Promise.all(
            user.purchasedCourses.map(async (courseId) => {
                console.log("courseId: ", courseId);
                const course = await Course.findById(courseId);
                console.log("course: ", course);

                const responseCourse = {
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    price: course.price,
                    imageLink: course.imageLink,
                    published: course.published,
                };
                console.log(responseCourse);
                return responseCourse;
            })
        );
        console.log(purchasedCourses);
        res.status(200).json({
            purchasedCourses: purchasedCourses,
        });
    } catch (error) {
        console.error("error fetching purchased courses", error);
        res.status(500).json({
            message: "error fetching purchased courses",
        });
    }
});

module.exports = router;
