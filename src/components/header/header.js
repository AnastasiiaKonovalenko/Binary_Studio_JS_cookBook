import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import connect from 'react-redux/es/connect/connect';
import { debounce } from 'lodash';
import { setQueryRecipe } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const Header = ({ setQuery2Redux }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [visibleQuery, setVisibleQuery] = useState('');

  const debouncedQuery = debounce(setQuery2Redux, 500);

  const handleQuery = (evt) => {
    setVisibleQuery(evt.target.value);
    debouncedQuery(evt.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            className="menu"
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
                Categories:
            </MenuItem>
            <MenuItem>
              <Link
                className="header__link link sublink"
                to="/categories/string"
              >
                String
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link sublink"
                to="/categories/number"
              >
                Number
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link sublink"
                to="/categories/array"
              >
                Array
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link sublink"
                to="/categories/object"
              >
                Object
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link sublink"
                to="/categories/function"
              >
                Function
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link sublink"
                to="/categories/regexp"
              >
                RegExp
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link sublink"
                to="/categories/patterns"
              >
                Patterns
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link sublink"
                to="/categories/dom"
              >
                DOM
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link"
                to="/write_for_cookbook"
              >
                Write for CookBook
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link"
                to="/ebooks"
              >
                eBooks
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                className="header__link link"
                to="/sigh_in"
              >
                Sign in
              </Link>
            </MenuItem>

          </Menu>
          <Typography
            className={classes.title}
            variant="h6" noWrap
          >
            CookBook JavaScript
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={visibleQuery}
              onChange={handleQuery}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapState2Props = state => ({
  recipes: state.recipes,
  queryRecipe: state.queryRecipe,
});

const mapDispatch2Props = ({
  setQuery2Redux: setQueryRecipe,
});

Header.propTypes = {
  setQuery2Redux: PropTypes.func.isRequired,
};

export default connect(mapState2Props, mapDispatch2Props)(Header);
