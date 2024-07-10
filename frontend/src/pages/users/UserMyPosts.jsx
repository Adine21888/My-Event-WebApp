import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../../contexts/AuthContext';
import PostCard from '../../components/posts/PostCard';
import NavbarDefault from '../../components/NavbarDefault';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const UserMyPosts = () => {
  const { user, token } = useContext(AuthContext);
  const [teamPosts, setTeamPosts] = useState([]);
  const [teamSearchPosts, setTeamSearchPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const [teamPostsResponse, teamSearchPostsResponse] = await Promise.all([
          axios.get(`http://localhost:5555/team-posts/myposts/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`http://localhost:5555/team-search-posts/myposts/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setTeamPosts(teamPostsResponse.data);
        setTeamSearchPosts(teamSearchPostsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, token]);

  if (loading) {
    return <Spinner />;
  }

  const data = [
    {
      label: "My Team Posts",
      value: "my-team-posts",
      desc: `List of your team posts.`,
    },
    {
      label: "My Team Search Posts",
      value: "my-team-search-posts",
      desc: `List of your team search posts.`,
    },
  ];

  return (
    <div>
      <NavbarDefault />
      <div className="flex flex-col items-center p-4 mt-16">
        <Tabs value="my-team-posts">
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
                  {value === 'my-team-posts' && (
                    teamPosts.length === 0 ? (
                      <p>No team posts found.</p>
                    ) : (
                      <div className="flex flex-wrap justify-center">
                        {teamPosts.map((post) => (
                          <PostCard key={post._id} post={post} />
                        ))}
                      </div>
                    )
                  )}
                  {value === 'my-team-search-posts' && (
                    teamSearchPosts.length === 0 ? (
                      <p>No team search posts found.</p>
                    ) : (
                      <div className="flex flex-wrap justify-center">
                        {teamSearchPosts.map((post) => (
                          <PostCard key={post._id} post={post} />
                        ))}
                      </div>
                    )
                  )}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default UserMyPosts;
