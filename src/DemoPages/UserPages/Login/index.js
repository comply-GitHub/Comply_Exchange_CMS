import React, { Fragment, Component, useState, useEffect } from "react";

import Slider from "react-slick";
// import {Button} from "@mui/material";
import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  TextField,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../redux/Actions";

const Login = () => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [isError, setError] = useState({ email: false, password: false });
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    initialSlide: 0,
    autoplay: true,
    adaptiveHeight: true,
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(data.email.trim()!=="" && data.password.trim()!=="")
   { dispatch(
      loginAction(data, () => {
        history.push("/content");
        window.location.reload();
      })
    );}
    else{
      if(data.email.trim()===""){
        setError({ ...isError, email: true });
      }else
     { setError({ ...isError, password: true });}
    }
  };
  return (
    <Fragment>
      <div className="h-99">
        <Row className="h-100 g-0 row">
          <Col lg="4" className="d-none d-lg-block">
            <div className="slider-light">
              <Slider {...settings}>
                <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                  <div
                    className="slide-img-bg"
                    style={{
                      backgroundImage: "url(" + bg1 + ")",
                    }}
                  />
                  <div className="slider-content">
                    <h3>Perfect Balance</h3>
                    <p>
                      ArchitectUI is like a dream. Some think it's too good to
                      be true! Extensive collection of unified React Boostrap
                      Components and Elements.
                    </p>
                  </div>
                </div>
                <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                  <div
                    className="slide-img-bg"
                    style={{
                      backgroundImage: "url(" + bg3 + ")",
                    }}
                  />
                  <div className="slider-content">
                    <h3>Scalable, Modular, Consistent</h3>
                    <p>
                      Easily exclude the components you don't require.
                      Lightweight, consistent Bootstrap based styles across all
                      elements and components
                    </p>
                  </div>
                </div>
                <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                  <div
                    className="slide-img-bg opacity-6"
                    style={{
                      backgroundImage: "url(" + bg2 + ")",
                    }}
                  />
                  <div className="slider-content">
                    <h3>Complex, but lightweight</h3>
                    <p>
                      We've included a lot of components that cover almost all
                      use cases for any type of application.
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
          </Col>
          <Col
            lg="8"
            md="12"
            className="h-100 d-flex bg-white justify-content-center align-items-center"
          >
            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
              <div className="app-logo" />
              <h4 className="mb-0">
                <div className="Label">Welcome</div>
                <span className="textClass">
                  Please sign in to your account
                </span>
              </h4>
              {/* <h6 className="mt-3">
                No account?{" "}
                <Link to="/register" className="text-primary">
                  Sign up now
                </Link>
              </h6> */}

              <div>
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label className="textClassLabel" for="exampleEmail">
                          Email
                        </Label>
                        <Input
                          required
                          autoComplete="off"
                          type="email"
                          name="email"
                          id="exampleEmail"
                          value={data.email}
                          placeholder="Email here..."
                          onChange={handleChange}
                        />
                      </FormGroup>
                      {isError.email ? (<small className="errorClass">Please Enter Email.</small>) : ''}
                    </Col>
                    <Col md={6} className="column">
                      <FormGroup>
                        <Label className="textClassLabel" for="examplePassword">
                          Password
                        </Label>
                        <Input
                          required
                          autoComplete="off"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="examplePassword"
                          placeholder="Password here..."
                          value={data.password}
                          onChange={handleChange}
                        />
                        <div
                          className="position-absolute d-flex end-0 mr-5 h-10"
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <AiOutlineEye
                              onClick={() => setShowPassword(false)}
                              aria-hidden="true"
                            />
                          ) : (
                            <AiOutlineEyeInvisible
                              onClick={() => setShowPassword(true)}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      </FormGroup>
                      {isError.password ? (<small className="errorClass">Please Enter Password.</small>) : ''}
                    </Col>
                  </Row>

                  <div className="d-flex align-items-center">
                    <div className="ms-auto">
                      {/* <Link
                        to="/forget"
                        className="btn-lg btn btn-link"
                        // onClick={() => {
                        //   history.push("/forget");
                        // }}
                      >
                        Forget Password
                      </Link>{" "} */}
                      <Button type="submit" color="primary" size="small">
                        Login
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default Login;
