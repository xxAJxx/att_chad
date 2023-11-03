import Atten from "../../models/Atten";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
	if (req.method !== "GET") {
		res.status(405).json({ success: false, data: "Method Not Allowed" });
		return;
	}

	try {
		const students = await Atten.find({});

		if (!students) {
			res.status(404).json({ success: false, data: "No students found" });
			return;
		}

		const data = students[0];
		// console.log(data);

		res.status(200).json({ success: true, data: JSON.stringify(data) });
	} catch (error) {
		res.status(500).json({ success: false, data: error.message });
	}
};

export default connectDb(handler);
