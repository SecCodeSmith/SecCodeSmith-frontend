import { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { BlogCard } from '../components/BlogCard';
import { fetchBlogPosts } from '../data/blogPostsData';

import style from '@styles/Blog.module.scss';
import type { BlogPostProps } from '../untils/BlogPostProps';

export const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, /*setCurrentPage*/] = useState(1);
  const [blogPostsData, setBlogPostsData] = useState<BlogPostProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogPosts();
      setBlogPostsData(data);
    };
    fetchData();
  }, []);

  if (!blogPostsData) {
    return <div>Loading...</div>;
  }
  
  const filteredPosts = searchQuery
    ? blogPostsData.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : blogPostsData;

    const filteredPostPageCount = Math.ceil(filteredPosts.length / 6);

  const featuredPost = blogPostsData.find(post => post.featured);
  
  const regularPosts = filteredPosts.filter(post => !post.featured);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const categories = Array.from(new Set(blogPostsData.map(post => post.category)));
  
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
          <div className="col-lg-8">
            {featuredPost && (!searchQuery || 
              featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              featuredPost.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
              featuredPost.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            ) && (
              <BlogCard post={featuredPost} />
            )}

            <div className="row">
              {regularPosts.map(post => (
                <div className="col-md-6" key={post.id}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>

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

            {filteredPostPageCount > 1 && (
              <nav className="mt-5" aria-label="Blog pagination">
                <ul className="pagination justify-content-center">
                  {(currentPage > 1) && ( <li className={`page-item ${style.pageItem}`}>
                    <a className={`page-link ${style.pageLink}`} href="#" aria-label="Previous">
                      <i className="fas fa-angle-left"></i>
                    </a>
                  </li>)}

                  {Array.from({ length: filteredPostPageCount }, (_, index) => (
                    <li className={`page-item ${style.pageItem}`} key={index}>
                      <a className={`page-link ${style.pageLink}`} href="#">{index + 1}</a>
                    </li>
                  ))}
                  {(currentPage < filteredPostPageCount) && ( <li className={`page-item ${style.pageItem}`}>
                    <a className={`page-link ${style.pageLink}`} href="#" aria-label="Next">
                      <i className="fas fa-angle-right"></i>
                    </a>
                  </li>)}
                </ul>
              </nav>
            )}
          </div>

          <div className={`col-lg-4 sidebar`}>
            <div className={`sidebar-widget ${style.sidebarWidget}`}>
              <h3 className={`widget-title ${style.widgetTitle}`}>Search</h3>
              <form className={`search-form ${style.searchForm}`}>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search articles..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className={`btn btn-primary ${style.btn}`} type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>

            <div className={`sidebar-widget ${style.sidebarWidget}`}>
              <h3 className={`widget-title ${style.widgetTitle}`}>Categories</h3>
              <div className="list-group">
                {categories.map((category, index) => {
                  const count = blogPostsData.filter(post => post.category === category).length;
                  return (
                    <div className={`list-group-item ${style.listGroupItem}`} key={index}>
                      <a href="#" onClick={() => setSearchQuery(category)}>
                        <span>{category}</span>
                        <span className={`category-count ${style.categoryCount}`}>{count}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`sidebar-widget ${style.sidebarWidget}`}>
              <h3 className={`widget-title ${style.widgetTitle}`}>Recent Posts</h3>
              <div className="recent-posts">
                {blogPostsData.slice(0, 3).map(post => (
                  <div className={`recent-post-item ${style.recentPostItem}`} key={post.id}>
                    <img src={post.image} className={`recent-post-thumb ${style.recentPostThumb}`} alt={post.title} />
                    <div className={style.recentPostInfo}>
                      <h4 className={style.recentPostTitle}>
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h4>
                      <span className={style.recentPostDate}>{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`sidebar-widget ${style.sidebarWidget}`}>
               <h3 className={`widget-title ${style.widgetTitle}`}>Popular Tags</h3>
              <div>
                {uniqueTags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={style.postTag} 
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