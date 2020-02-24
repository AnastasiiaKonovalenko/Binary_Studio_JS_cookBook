import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  useParams,
} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../footer/footer';
import PreviousVariations from '../previousVariations/previousVariations';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      boxSizing: 'border-box',
    },
  },

  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  code: {
    '& > *': {
      display: 'flex',
      margin: '20px 0',
      justifyContent: 'center',
      color: '#fff',
    },
  },

  codeText: {
    '& > *': {
      backgroundColor: '#555',
      color: '#fff',
      padding: '40px 0',
      paddingLeft: '20px',
      width: '100%',
    },
  },

  codeActive: {
    boxShadow: '0 1px 15px 5px rgba(0, 0, 0, 0.25)',
  },

  input: {
    boxSizing: 'border-box',
    color: 'black',
    fontSize: 16,
    textAlign: 'justify',
    width: '100%',
  },

  inputActive: {
    boxShadow: '0 1px 15px 5px rgba(0, 0, 0, 0.25)',
  },
}));

const Recipe = ({ recipes }) => {
  const classes = useStyles();
  const { id } = useParams();
  const article = recipes.find(recipe => recipe.id === id);
  const textAreaArticle = useRef(null);
  const textAreaCode = useRef(null);

  const [initialArt, setInitialArt] = useState(`${article.article}`);
  const [initialCode, setInitialCode] = useState(`${article.code}`);
  const [valueArt, setValueArt] = React.useState(`${article.article}`);
  const [valueCode, setValueCode] = React.useState(`${article.code}`);
  const [activeEditingArticle, setEditingArt] = useState(false);
  const [activeEditingCode, setEditingCode] = useState(false);
  const [prevRecipe, setPrev] = useState([]);

  const handleSetArt = (event) => {
    setValueArt(event.target.value);
  };

  const handleSetCode = (event) => {
    setValueCode(event.target.value);
  };

  useEffect(() => {}, []);
  const months = [
    'Jen',
    'Feb',
    'March',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const handlerChangeArticle = () => {
    textAreaArticle.current.focus();
    setEditingArt(true);
    textAreaCode.current.focus();
    setEditingCode(true);
  };

  const handlerConfirm = () => {
    setPrev([article, ...prevRecipe]);
    setEditingArt(false);
    setInitialArt(valueArt);
    setEditingCode(false);
    setInitialCode(valueCode);
  };

  const handlerCancel = () => {
    if (activeEditingArticle) {
      setEditingArt(false);
      setValueArt(initialArt);
    }

    if (activeEditingCode) {
      setEditingCode(false);
      setValueCode(initialCode);
    }
  };

  return (
    <>
      <Header />
      <article className="article">
        <h1 className="article__heading">
          {article.name}
        </h1>

        <div className={classes.buttons}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handlerChangeArticle}>
            Edit
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handlerConfirm}
          >
            Confirm
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handlerCancel}
          >
            Cancel
          </Button>
        </div>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            InputProps={{
              readOnly: !activeEditingArticle,
              className: activeEditingArticle
                ? [classes.input, classes.inputActive]
                : classes.input,
            }}
            onChange={handleSetArt}
            autoFocus
            inputRef={textAreaArticle}
            id="standard-multiline-flexible"
            multiline
            value={valueArt}
          />
        </form>

        <div>
          <form className={activeEditingCode
            ? `${classes.root} ${classes.code}  ${classes.codeActive}`
            : `${classes.root} ${classes.code}`
          } noValidate autoComplete="off">
            <TextField
              InputProps={{
                readOnly: !activeEditingCode,
                className: [classes.input, classes.codeText],
              }}
              autoFocus
              onChange={handleSetCode}
              inputRef={textAreaCode}
              className="article__code"
              id="standard-multiline-flexible"
              multiline
              value={valueCode}
            />
          </form>
        </div>

        <p className="article__date">
          <span>Published: </span>
          {
            article.published.split('/')
              .map((item, i) => (i === 0
                ? (months.find((month, index) => (index === +item && month)))
                : item)).map((item, i) => (i === 1 ? (`${item}, `) : item)).join(' ')
          }
        </p>
        <p className="article__author">
          <span>Author: </span>
          {article.author}
        </p>

        <p className="article__source">
          <span>Source: </span>
          <a href={article.source}>Link</a>
        </p>

        <p className="article__tag">
          <span>Tag: </span>
          {article.tags}
        </p>
      </article>
      <PreviousVariations prevRecipe={prevRecipe}/>
      <Footer/>
    </>
  );
};

const mapState2Props = state => ({
  recipes: state.recipes,
  isLoading: state.isLoading,
});

Recipe.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
};

Recipe.defaultProps = {
  recipes: [],
};

export default connect(mapState2Props)(Recipe);
