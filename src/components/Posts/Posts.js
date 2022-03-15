import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from "react-redux";
import { Grid} from "@mui/material"

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts)

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map(post => (
          <Grid item key={post.id} xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts