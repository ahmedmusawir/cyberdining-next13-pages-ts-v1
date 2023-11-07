import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import { v2 as cloudinary } from "cloudinary";

// Set up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Disable Next.js body parsing, as we'll use formidable for that
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  // Parse the request to get the file via formidable
  const form = new IncomingForm({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the form", err);
      return res.status(500).end("Internal server error");
    }

    // The 'image' field from your form
    const imageFile = files.image;
    console.log("Image in upload to cloudinary", imageFile);

    // 'image' is the field name from the form
    const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;

    if (!file) {
      return res.status(400).end("No file uploaded");
    }

    try {
      // Read the file into a Buffer
      const fileBuffer = await fs.readFile(file.filepath);

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload_stream(
        {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error", error);
            return res.status(500).end("Error uploading to Cloudinary");
          }

          // Delete the file from the server after upload
          fs.unlink(file.filepath);

          // Send back the URL of the uploaded image
          return res.status(200).json({ url: result?.secure_url });
        }
      );

      // Write the file buffer to the upload stream
      uploadResponse.end(fileBuffer);
    } catch (error) {
      console.error("Server error", error);
      return res.status(500).end("Internal server error");
    }
  });
};
