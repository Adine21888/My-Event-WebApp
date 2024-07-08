import React from 'react';
import {
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";

const DetailedPostView = ({ post }) => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <Avatar src="https://randomuser.me/api/portraits/men/94.jpg" alt="User Avatar" className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
                <Typography variant="h6" color="blue-gray">
                  {post.createdBy.name}
                </Typography>
                <Typography variant="body" color="gray">
                  {post.createdBy.role}
                </Typography>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <Button color="blue" onClick={() => {/* Handle Contact */}}>
                    Contact
                  </Button>
                  <Button color="gray" onClick={() => {/* Handle Resume */}}>
                    Resume
                  </Button>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <Typography variant="body" color="blue-gray" className="uppercase font-bold tracking-wider mb-2">
                  Skills
                </Typography>
                <ul>
                  {post.skills.map((skill, index) => (
                    <li key={index} className="mb-2">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                About Me
              </Typography>
              <Typography variant="body" color="gray">
                {post.about}
              </Typography>
              <div className="flex justify-center items-center gap-6 my-6">
                {/* Social Media Links */}
                {/* Example: LinkedIn */}
                <a href={post.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-600" aria-label="Visit LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                    <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
                {/* Other social media icons */}
              </div>
              <Typography variant="h6" color="blue-gray" className="mt-6 mb-4">
                Experience
              </Typography>
              {post.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <Typography variant="body" color="blue-gray" className="font-bold">
                      {exp.title}
                    </Typography>
                    <Typography variant="body" color="gray">
                      {exp.company} - {exp.years}
                    </Typography>
                  </div>
                  <Typography variant="body" color="gray" className="mt-2">
                    {exp.description}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPostView;
