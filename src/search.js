import React, { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from "react-hook-form";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Link} from '@mui/material';
function Search() {
    const [loading, setLoading] = useState(false);
    const [card,setCard] = useState(false)
    const [user,setUser] =useState({})
    const { register, handleSubmit, formState: { errors } } = useForm()
    const fetchuser = async (username) =>{
        const response = await fetch(`https://api.github.com/users/${username}`)
        const json = await response.json()
        setUser(json);
        setLoading(false)
        if(!json.message) {
            setCard(true)
        }
        else {
            setCard(false)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                setLoading(true)
                fetchuser(data.username)
            })}>
                <input {...register("username", { required: "This field is required" })} placeholder='username' />
                <LoadingButton type="submit" startIcon={<SearchIcon />} loading={loading} />
                <p>{errors.username?.message}</p>
            </form>
            {card && <Card sx={{ width: 400}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"
                        image={user.avatar_url}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {user.login}
                        </Typography>
                        <Link href={user.html_url}>{user.html_url}</Link>
                    </CardContent>
                </CardActionArea>
            </Card>}
            {user.message && <p>Github User Not Found</p>}
        </div>
    );
}

export default Search;