import React from 'react';
import { useCurrentUser } from '@/hooks/index';


import { connectToDatabase } from '../../../util/mongodb'

export default function Movies({title,creator,link, comments, id}) {
   console.log(comments);
   console.log(id);
  return (

    <div>
      <h2>{title}<small><i> ({link})</i></small></h2>
{/*}<p>{comments}</p>*/}

    </div>

  );

}
export async function getStaticPaths(){
  return{
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({params}){
  const {db} = await connectToDatabase();
  const data = await db.collection("posts").findOne({_id: params.id} );

  //  console.log(params.id);
      const allComments = await data.comments;
      const id = await data._id;

          console.log(allComments);
  //console.log(data);
  //console.log(data.content);
      console.log(data._id);
return {
  props: {
    newsPosts: JSON.parse(JSON.stringify(data.content)),
    title: JSON.parse(JSON.stringify(data.content)),
    creator: JSON.parse(JSON.stringify(data.creatorId)),
    link: JSON.parse(JSON.stringify(data.link)),
    comments: JSON.parse(JSON.stringify(allComments)),
    id: JSON.parse(JSON.stringify(id)),


    revalidate: 1
  }

}

}
