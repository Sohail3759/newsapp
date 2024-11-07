import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,image,url} = this.props
    return (
      <div>
        <div className="card" style={{width:"18rem"}}>
          <img src= {!image ? "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg" : image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{!title ? "North Korean troops are now in Kursk to help": title}...</h5>
            <p className="card-text">{!description ? "Pyongyang alarms the West by seeking to assist Vladimir Putin in retaking territory from": description}...</p>
            <a href={url} rel='noreferrer' target="_blank" className="btn btn-dark">Go to News</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
