import React, {useEffect, useMemo, useState} from 'react';
import API from '../data/api/api'
import * as _ from 'lodash'
import Preloader from './Preloader'
import {Post} from '../data/types'
import styled from "styled-components";

const MainWrapper = styled.main`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 20px;

  h1 {
    margin-bottom: 20px;
    color: #2b2b2b
  }

  .button {
    padding: 10px 20px;
    border-radius: 3px;
    border: 1px solid #818181;
    margin-bottom: 20px;
    width: fit-content;
    cursor: pointer;

    &:hover {
      background-color: #f9f9f9;
    }
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 40px;
    width: 100%;

    &:not(:last-of-type) {
      border-bottom: 1px solid #f5f5f5;
    }

    &:hover {
      background-color: #f8f8f8;
    }
  }

  .list-item__title {
    text-align: right;
  }

  .list-item__image {
    margin-right: 10px;
    height: 70%;
    border-radius: 50%;
  }
`

const Main: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>();
    const [isDescending, setIsDescending] = useState<boolean>(false)

    const sortedPosts = useMemo( () => {
        let result = _.sortBy(posts,'creation_date')
        if (isDescending) return result.reverse()
        return result
    }, [posts, isDescending])

    useEffect(() => {
        new API().fetchPosts().then(setPosts)
    }, []);

    if (!posts) return <Preloader/>

    return (
        <MainWrapper>
            <h1>StackOverflow posts</h1>

            <div className='button' onClick={() => setIsDescending(status => !status)}>
                {isDescending ? 'Set from oldest to newest' : 'Set from newest to oldest'}
            </div>

            {sortedPosts.map(item => {
                return <a className='list-item' rel="noreferrer" href={item.link} target='_blank' key={item.question_id}>
                    <img className='list-item__image' alt={item.owner.display_name} src={item.owner.profile_image}/>
                    {/* <div>{new Date(item.creation_date * 1000).toLocaleDateString('en')}</div> */}
                    <div className="list-item__title" dangerouslySetInnerHTML={{__html: item.title}}/>
                </a>
            })}
        </MainWrapper>
    );
}

export default Main
