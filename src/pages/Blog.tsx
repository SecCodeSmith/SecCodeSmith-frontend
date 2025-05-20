import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { BlogCard } from '../components/BlogCard';
import { blogPostsData } from '../data/blogPostsData';

import '@styles/_variables.scss';
import '@styles/Blog.scss';

export const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter blog posts based on search query
  const filteredPosts = searchQuery
    ? blogPostsData.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : blogPostsData;
  
  // Get the featured post
  const featuredPost = blogPostsData.find(post => post.featured);
  
  // Get regular posts (non-featured)
  const regularPosts = filteredPosts.filter(post => !post.featured);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Generate a list of unique categories
  const categories = Array.from(new Set(blogPostsData.map(post => post.category)));
  
  // Generate a list of unique tags
  const allTags = blogPostsData.flatMap(post => post.tags);
  const uniqueTags = Array.from(new Set(allTags));
  
  return (
    <>
      <PageHeader 
        title="The Arcane Chronicles" 
        subtitle="Insights, discoveries, and technical runes from the digital forge" 
      />
      
      <div className="container mt-5">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Featured Post */}
            {featuredPost && (!searchQuery || 
              featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              featuredPost.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
              featuredPost.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            ) && (
              <BlogCard post={featuredPost} />
            )}

            {/* Regular Posts */}
            <div className="row">
              {regularPosts.map(post => (
                <div className="col-md-6" key={post.id}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>

            {/* No Posts Message */}
            {filteredPosts.length === 0 && (
              <div className="text-center mt-5">
                <h3>No posts found matching your search.</h3>
                <button 
                  className="btn btn-primary mt-3" 
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredPosts.length > 0 && (
              <nav className="mt-5" aria-label="Blog pagination">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <i className="fas fa-angle-left"></i>
                    </a>
                  </li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <i className="fas fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 sidebar">
            {/* Search Widget */}
            <div className="sidebar-widget">
              <h3 className="widget-title">Search</h3>
              <form className="search-form">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search articles..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>

            {/* Categories Widget */}
            <div className="sidebar-widget">
              <h3 className="widget-title">Categories</h3>
              <div className="list-group">
                {categories.map((category, index) => {
                  const count = blogPostsData.filter(post => post.category === category).length;
                  return (
                    <div className="list-group-item" key={index}>
                      <a href="#" onClick={() => setSearchQuery(category)}>
                        <span>{category}</span>
                        <span className="category-count">{count}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="sidebar-widget">
              <h3 className="widget-title">Recent Posts</h3>
              <div className="recent-posts">
                {blogPostsData.slice(0, 3).map(post => (
                  <div className="recent-post-item" key={post.id}>
                    <img src={post.image} className="recent-post-thumb" alt={post.title} />
                    <div className="recent-post-info">
                      <h4 className="recent-post-title">
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h4>
                      <span className="recent-post-date">{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Widget */}
            <div className="sidebar-widget">
              <h3 className="widget-title">Popular Tags</h3>
              <div>
                {uniqueTags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="post-tag" 
                    onClick={() => setSearchQuery(tag)}
                    style={{ cursor: 'pointer' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};