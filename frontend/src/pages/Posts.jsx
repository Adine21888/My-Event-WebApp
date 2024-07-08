import React from 'react';
import NavbarDefault from '../components/NavbarDefault';
import TeamPostList from './posts/TeamPostList';
import TeamSearchPostList from './posts/TeamSearchPostList';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const Posts = () => {
  const data = [
    {
      label: "Formed Teams",
      value: "formed-teams",
      desc: `List of formed teams.`,
    },
    {
      label: "Team Requests",
      value: "team-requests",
      desc: `List of team requests.`,
    },
  ];

  return (
    <div>
      <NavbarDefault />
      <div className="container mx-auto px-4 py-8">
        <Tabs value="formed-teams">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                <div className="mt-4">
                  <p>{desc}</p>
                  {/* You can render the content of each tab here */}
                  {value === 'formed-teams' && <TeamPostList />}
                  {value === 'team-requests' && <TeamSearchPostList />}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default Posts;
