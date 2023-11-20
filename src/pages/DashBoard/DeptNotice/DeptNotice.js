import style from './notice.module.css';
import {Grid, IconButton, List, ListItem, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LoginContext } from '../../../App';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import DeptNoticeWrite from './DeptNoticeWrite.js';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
color: 'inherit',
'& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
    width: '20ch',
    },
},
}));

const DeptNoticeList = () => {
    const {loginID} = useContext(LoginContext);
    const [isExcutives,setExcutives] = useState(false);
    useEffect(()=>{
        axios.get(`/api/dept_notice/${loginID}`).then(res=>{
            console.log(res.data);
            setExcutives(res.data);
        }).catch((e)=>{
            console.log(e);
        });
    },[]);
    return (
        <div className={`${style.noticeContents}`}>
            <div className={`${style.padding10}`}>
                <Grid container spacing={2}>
                    <Grid item xs={7} className={`${style.vcenter}`}>
                        <Typography variant="h5" >
                            부서 내 소식
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Search>
                            <SearchIconWrapper>
                            <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid>
                    <Grid item xs={1} className={`${style.vcenter}`}>
                        
                    </Grid>
                </Grid>
            </div>
            <hr></hr>
            <div className={`${style.marginT40}`}>
                <Grid container rowSpacing={2}>
                    <Grid xs={1} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            번호
                        </Typography>
                    </Grid>
                    <Grid xs={6} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            제목
                        </Typography>
                    </Grid>
                    <Grid xs={3} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            작성일자
                        </Typography>
                    </Grid>
                    <Grid xs={2} className={style.center}>
                        <Typography className={`${style.fs18} ${style.bold}`}>
                            상태
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <hr></hr>
            <div id='list'>
                <List sx={style} component="nav" aria-label="mailbox folders">
                    <ListItem button>
                        <Grid container className={`${style.marginT10}`}> 
                            <Grid xs={1} className={style.center}>
                                <Typography className={`${style.fs} ${style.b}`}>
                                1
                                </Typography>
                            </Grid>
                            <Grid xs={6} className={style.center}>
                                <Typography className={`${style.fs} ${style.b}`}>
                                    2
                                </Typography>
                            </Grid>
                            <Grid xs={3} className={style.center}>
                                <Typography className={`${style.fs} ${style.b}`}>
                                3
                                </Typography>
                            </Grid>
                            <Grid xs={2} className={style.center}>
                                <Typography className={`${style.fs} ${style.b}`}>
                                4
                                </Typography>
                            </Grid>
                        </Grid>            
                    </ListItem>
                </List>
            </div>
        </div>
    )
}

const DeptNotice = () => {
    return (
        <Routes>
            <Route path='/' element={<DeptNoticeList/>}></Route>
            <Route path='write_notice' element={<DeptNoticeWrite/>}></Route>
        </Routes>
    )
}
export default DeptNotice;