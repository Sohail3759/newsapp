import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'


export class News extends Component {
  // articles = [
  //   {
  //       "source": {
  //           "id": "bbc-sport",
  //           "name": "BBC Sport"
  //       },
  //       "author": null,
  //       "title": "England in Pakistan: Ollie Pope, Ben Stokes & Test cricket among five takeaways",
  //       "description": "England are exhilarating when they are good but infuriating when they are not. Stephan Shemilt tackles five questions after defeat in Pakistan.",
  //       "url": "http://www.bbc.co.uk/sport/cricket/articles/cy7dden45z3o",
  //       "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_sport/d126/live/9341e8d0-9441-11ef-899d-2fbddf2d9b52.jpg",
  //       "publishedAt": "2024-10-27T10:22:15.3584157Z",
  //       "content": "The impressive emergence of Brydon Carse is the latest stage in the rebuilding of an England pace attack in a previously unthinkable world without James Anderson and Stuart Broad.\r\nNot everything is … [+1668 chars]"
  //   },
  //   {
  //       "source": {
  //           "id": "espn-cric-info",
  //           "name": "ESPN Cric Info"
  //       },
  //       "author": null,
  //       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //       "publishedAt": "2020-04-27T11:41:47Z",
  //       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //       "source": {
  //           "id": "espn-cric-info",
  //           "name": "ESPN Cric Info"
  //       },
  //       "author": null,
  //       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //       "publishedAt": "2020-03-30T15:26:05Z",
  //       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   },
  //   {
  //     "source": {
  //         "id": "espn-cric-info",
  //         "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  // }
  // ]

  static defaultProps = {
    country: 'in',
    pagesize : 5,
    category: 'general'
  }

  static propTypes ={
    country : PropTypes.string,
    pagesize : PropTypes.number,
    category : PropTypes.string
  }

  constructor() {
    super();
    // console.log("this is a constructor")
    this.state = {
      articles:[],
      loading: false,
      page: 1,
      totalResults:20
    }
  }


  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=e6ecccd6d4094fe28cb2d3b8bbaf62c6&page=1&pagesize=${this.props.pagesize}`
    this.setState({loading:true})
    let data = await fetch(url)
    let parsedata = await data.json()
    console.log(parsedata)
    this.setState({ articles: parsedata.articles,
      totalResults:parsedata.totalResults,
      loading :false
     })
  }


  handleprevpage = async () => {
    console.log("prev page")

    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=e6ecccd6d4094fe28cb2d3b8bbaf62c6&page=${this.state.page-1}&pagesize=${this.props.pagesize}`
    this.setState({loading:true})
    let data = await fetch(url)
    let parsedata = await data.json()

    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false
    })

  }

  handlenextpage = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize)) {

    }else{
      console.log("next page")
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=e6ecccd6d4094fe28cb2d3b8bbaf62c6&page=${this.state.page+1}&pagesize=${this.props.pagesize}`
      this.setState({loading:true})
      let data = await fetch(url)
      let parsedata = await data.json()
  
      this.setState({
        page: this.state.page + 1,
        articles: parsedata.articles,
        loading : false
      })
 
    }

  }
  render() {
    return (
      <div className='container my-3'>
      <h1 className="text-center my-2">NewsMonkey-Top Headlines</h1>
      {this.state.loading && <Loader/>}
        <div className="row" >
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4  my-2" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} url={element.url} image={element.urlToImage} />
            </div>
          })}
        </div>

       {!this.state.loading && <div className="container my-3 d-flex justify-content-between">
          <button type='button' disabled ={this.state.page===1} className="btn btn-dark mx-3" onClick={this.handleprevpage}>&larr; Previous</button>
          {/* <div className="full"></div> */}
          <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize)} className="btn btn-dark" onClick={this.handlenextpage}>Next &rarr;</button>
        </div>}

      </div>

      /* <div className='container my-3'>
          <div className="row" >
           <div className="col-md-4  my-2" key={element.url}>
               <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0,88):""} url ={element.url} image={element.urlToImage} />
             </div>
           </div>
         </div> */
    )
  }
}



export default News
