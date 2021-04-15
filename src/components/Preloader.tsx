import React, {useEffect, useState} from 'react';
import API from '../data/api/api'
import {Post, SortingType} from '../data/types'
import styled from "styled-components";

const ListWrapper = styled.main`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 20px;

  .item {
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

  .title {
    text-align: right;
  }

  .image {
    margin-right: 10px;
    height: 70%;
    border-radius: 50%;
  }
`

const Preoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  font-weight: bold;
  font-size: 20px;
`

export const List = () => {

    const [posts, setPosts] = useState<Post[]>();
    const [sortingType, setSortingType] = useState<SortingType>(SortingType.ascending)

    useEffect(() => {
        new API().fetchPosts().then(setPosts)
    }, []);

    if (!posts) return <Preoader>Loading...</Preoader>

    return (

        <ListWrapper>
            {posts.map(item => {
                return <a className='item' rel="noreferrer" href={item.link} target='_blank' key={item.question_id}>
                    <img className='image' alt={item.owner.display_name} src={item.owner.profile_image}/>
                    <div className="title" dangerouslySetInnerHTML={{__html: item.title}}/>
                </a>
            })}
        </ListWrapper>
    );
}
