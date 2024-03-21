import React, { Fragment, useState } from 'react'
import cx from 'classnames'
import { Button } from '@mui/material'

import { connect } from 'react-redux'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
// import { useEffectOnce } from "../.././Translator/UseEffectOne.jsx";

import HeaderLogo from '../AppLogo'

// import SearchBox from "./Components/SearchBox";
import MegaMenu from './Components/MegaMenu'
import UserBox from './Components/UserBox'
import GoogleTranslate from './newFile'
import HeaderDots from './Components/HeaderDots'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      translate: false
    }
  }

  //   componentDidMount() {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = this.googleTranslateElementInit;
  // }

  // googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false
  //     },
  //     "google_translate_element"
  //   );
  // };

  // googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false,
  //     },
  //     "google_translate_element"
  //   );
  // };

  //  translator = () =>
  // new Promise((resolve, reject) => {
  //   var addScript = document.createElement('script');
  //   addScript.setAttribute(
  //     'src',
  //     '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = this.googleTranslateElementInit;

  //     //   addScript.setAttribute(
  //     //  "src",
  //     //  "translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //     //  );
  //     //  document.body.appendChild(addScript);
  //     //  window.googleTranslateElementInit = this.googleTranslateElementInit;
  // })

  // translator = () => {
  //   var addScript = document.createElement("script");
  //   // var addScript =document.getElementById("script")
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //     );
  //     document.body.appendChild(addScript);
  //     window.googleTranslateElementInit = this.googleTranslateElementInit;
  //   };

  // componentDidMount() {
  //   const { translate } = this.state;
  //   this.translator();
  //   if (!translate) {
  //     this.setState({ translate: true });
  //   }
  // }

  render () {
    let { headerBackgroundColor, enableMobileMenuSmall, enableHeaderShadow } =
      this.props
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition
            component='div'
            className={cx('app-header', headerBackgroundColor, {
              'header-shadow': enableHeaderShadow
            })}
            appear={true}
            timeout={1500}
            enter={false}
            exit={false}
          >
            <div>
              <HeaderLogo />
              <div
                className={cx('app-header__content', {
                  'header-mobile-open': enableMobileMenuSmall
                })}
              >
                <div className='app-header-left'>
                  {/* <SearchBox />
                   */}
                    {/* <MegaMenu /> */}
                   
                </div>
                <div className='app-header-right'>

                  <div id='google_translate_element'></div>
                  <UserBox/>
                  {/* <Button id="google_translate_element"></Button>
                  <div id="script"></div> */}
                  {/* <GoogleTranslate/> */}
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
