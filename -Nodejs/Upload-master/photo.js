import {ROOT_QUERY} from'./app' // src/app.js
import React from 'react'
import {Query} from 'react-apollo'

const photo = () => 
<Query query = {ALL_PHOTOS_QUERY}> 
    {() => loadings? <p></p> : data.allPhotos.map(
            photo => <image
                key={photo.id}
                src={photo.url}
                alt={photo.name}
                width={350}
            />
    )}
</Query>

export default photo;