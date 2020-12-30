import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    }
  }
  render() {
    const { blogs } = this.props;
    // console.log("redux state",this.props.blogs);
    // alert(blogs.length)
      // console.log(blogs)
    return (
      <div className="article-list">
        <h2 className="article-list__title">Ethereum Price Updates</h2>
        <div className="article-list__cards">
          {blogs.length>0&&
            blogs.map(blog => {
              const { title, link } = blog.title;
              const { image, name, date } = blog.author;
              const { article, articleImage } = blog;
              return (
                <article className="article-card" id="post-123" key={title}>
                  <div className="article-card__article">
                    <div className="article-card__body">

                      <h2><Link to={link}>{title}</Link></h2>
                      <div className="article-card__meta flex--acenter">
                        <div className="author-avatar">
                          <img src={image} alt="Nick" />
                        </div>
                        <div className="author-name">
                          <div className="meta-label">Author</div>
                          {name} </div>
                        <div className="meta-posted">
                          <span className="mega-hero__label">Published</span>
              <span className="meta__posted-on"><Link to={link} rel="bookmark"><time className="entry-date published updated" >{/*datetime="2019-08-19T18:31:39+01:00"*/ }
                            <br />{date}</time></Link></span> </div>

                      </div>
                      <div className="article-content">
                        <p dangerouslySetInnerHTML={{ __html: article }}></p>
                        {/* {article} */}
                        ... <Link to={link} className="read-more">Read article</Link>
                      </div>
                    </div>
                    <div className="article-card__image">
                      <img src={articleImage} alt="Featured IMG: Bizarre Bitcoin Conf, ETH Tops Developer Rankings &amp; Binance To Lauch Libra Competitor" />
                    </div>
                  </div>
                </article>
              )
            })
          }

        </div>
        
      </div>
    );
  }
}
const mapStateToProps=(store)=>{
  return{
    blogs:store.blogs
  }
}
export default connect(mapStateToProps)(Blog);
