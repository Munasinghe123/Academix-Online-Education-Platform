const CourseModel = require('../models/CourseModel')

const createcourse = async (req, res) => {

    try {
        const { courseName, courseDescription, instructorName,
            instructorEmail, category, topics, prerequisites, price
        } = req.body

        const photo = req.file ? req.file.filename : null;

        const newCourse = new CourseModel({
            courseName,
            courseDescription,
            instructorName,
            instructorEmail,
            category,
            topics:
                topics.map(topic => ({
                    topicName: topic.topicName,
                    documentUrl: topic.documentUrl,
                    videoUrl: topic.videoUrl
                })),
            prerequisites,
            price,
            photo
        })

        await newCourse.save();

        console.log(newCourse)

        res.status(200).json({ newCourse })

    } catch (err) {
        console.log(err);
    }

}

module.exports = { createcourse }