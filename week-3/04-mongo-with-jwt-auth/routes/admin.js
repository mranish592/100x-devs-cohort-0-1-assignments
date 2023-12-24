const { Router, json } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course, jwtPassword } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post("/signup", async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const existingAdminUser = await Admin.findOne({ username: username });
    if (existingAdminUser) {
        return res.status(400).json({
            message: "Can't signup, username already exists",
        });
    }

    const admin = new Admin({
        username: username,
        password: password,
    });

    admin
        .save()
        .then(() => {
            console.log("Admin saved");
            res.status(200).json({ message: "Admin created successfully" });
        })
        .catch((error) => {
            console.error("Error in saving admin", error);
            res.status(500).json({ message: "Error Saving admin" });
        });
});

router.post("/signin", async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const existingAdminUser = await Admin.findOne({ username: username });
    if (!existingAdminUser) {
        return res.status(403).json({
            message: "Incorrect username or password",
        });
    }

    if (
        existingAdminUser.username != username ||
        existingAdminUser.password != password
    ) {
        return res.status(403).json({
            message: "Incorrect username or password",
        });
    }

    const token = jwt.sign({ username }, jwtPassword);
    return res.status(200).json({
        token: token,
    });
});

router.post("/courses", adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const course = Course({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: true,
    });

    course
        .save()
        .then(() => {
            console.log("Course saved");
            res.status(200).json({
                message: "Course created successfully",
                courseId: course._id,
            });
        })
        .catch((error) => {
            console.error("Error in saving admin", error);
            res.status(500).json({ message: "Error Saving admin" });
        });
});

router.get("/courses", adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
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

module.exports = router;
