const mongoose = require("mongoose");

const AttenSchema = new mongoose.Schema(
	{
	},
);

export default mongoose.models.Atten || mongoose.model("Atten", AttenSchema);
