import { useEffect, useState } from 'react';
import { lazy } from 'react';
const PageHeader = lazy(() => import('../components/PageHeader'));
const BlogCard = lazy(() => import('../components/BlogCard'));
import { fetchBlogPostsPage, fetchBlogPagesCount, fetchBlogCategories, fetchBlogTags } from '../data/blogPostsData';

import style from '@styles/Blog.module.scss';
import type { BlogPostProps, BlogCategoryProps, BlogTagsProps } from '../untils/BlogPostProps';
import { Spinner } from '../components/Spinner';
import { redirect, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../Config';

export const Blog = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string[]>([]);
  const [searchTag, setSearchTag] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<BlogPostProps[]>([]);
  const [categories, setCategories] = useState<BlogCategoryProps[]>([]);
  const [tags, setTags] = useState<BlogTagsProps[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

   const perPage = 6;
 

  useEffect(() => {
    setLoading(true);
    const loadCount = async () => {
      try {
        const count = await fetchBlogPagesCount(perPage);
        setTotalPages(count);
      } catch (err) {
        console.error(err);
      }
    };
    loadCount();
  }, [perPage]);

  useEffect(() => {
    const fechSorkItems = async () => {
      try {
        const category = await fetchBlogCategories();
        const tag = await fetchBlogTags();

        setCategories(category);
        setTags(tag);

      } catch (err) {
        console.error('Error fetching page count:', err);
        return;
      }
    };

    const fetchData = async () => {
      try {
        const filter = searchQuery || searchCategory.length > 0 || searchTag.length > 0
          ? { title: searchQuery, tags: searchTag, category: searchCategory }
          : undefined;
        const data = await fetchBlogPostsPage(currentPage, perPage, filter);

        setPosts(data.posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fechSorkItems();
  }, [currentPage, searchQuery, navigate, searchCategory, searchTag]);

  if (loading) {
    return <Spinner />;
  }

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);


  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
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

            {regularPosts.length === 0 && !featuredPost && (
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

            {totalPages > 1 && (
              <nav className="mt-5" aria-label="Blog pagination">
                <ul className="pagination justify-content-center">
                  {(currentPage > 1) && ( <li className={`page-item ${style.pageItem}`}>
                    <a className={`page-link ${style.pageLink}`} href="#" aria-label="Previous">
                      <i className="fas fa-angle-left"></i>
                    </a>
                  </li>)}

                  {Array.from({ length: totalPages }, (_, index) => (
                    <li className={`page-item ${style.pageItem}`} key={index}>
                      <a className={`page-link ${style.pageLink}`} href="#">{index + 1}</a>
                    </li>
                  ))}
                  {(currentPage < totalPages) && ( <li className={`page-item ${style.pageItem}`}>
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
                    onChange={e => setSearchQuery(e.target.value)}
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
                {categories && categories.map((category, index) => (
                  <div className={`list-group-item ${style.listGroupItem}`} key={index}>
                      <a href="#" onClick={() => {setSearchQuery(category.slug); goToPage(1);}}>
                        <span>{category.title}</span>
                        <span className={`category-count ${style.categoryCount}`}>{category.BlogCount}</span>
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className={`sidebar-widget ${style.sidebarWidget}`}>
              <h3 className={`widget-title ${style.widgetTitle}`}>Recent Posts</h3>
              <div className="recent-posts">
                {posts.slice(0, 3).map(post => (
                  <div className={`recent-post-item ${style.recentPostItem}`} key={post.id}>
                    <img src={`${API_BASE_URL}${post.image}`} className={`recent-post-thumb ${style.recentPostThumb}`} alt={post.title} />
                    <div className={style.recentPostInfo}>
                      <h4 className={style.recentPostTitle}>
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h4>
                      <span className={style.recentPostDate}>{post.publish_at}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`sidebar-widget ${style.sidebarWidget}`}>
               <h3 className={`widget-title ${style.widgetTitle}`}>Popular Tags</h3>
              <div>
                {tags && tags.map((tag, index) => (
                  <span 
                    key={index} id={tag.slug}
                    className={`${style.postTag} ${searchTag.includes(tag.slug) ? style.active : ''}`}
                    onClick={() => {
                      let selectedTag = searchTag;
                      const tagElement = document.getElementById(tag.slug);
                      if (selectedTag.includes(tag.slug)) {
                        selectedTag = selectedTag.filter(t => t !== tag.slug);
                        tagElement?.classList.remove(style.active);
                      } else {
                        selectedTag.push(tag.slug);
                        tagElement?.classList.add(style.active);
                      }
                      setSearchTag(selectedTag);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {tag.name}
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

export default Blog;