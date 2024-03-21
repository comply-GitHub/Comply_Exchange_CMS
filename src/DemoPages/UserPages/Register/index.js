import React, { Fragment, Component,useState } from "react";

import Slider from "react-slick";
import "./index.scss";

// import bg3 from "../../../assets/utils/images/originals/citynights.jpg";
import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import {Checkbox} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import Utils from "../../../Utils";
import { useDispatch } from "react-redux";
import { signupAction } from "../../../redux/Actions";

const Register = () => {
  const dispatch=useDispatch();
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
    const [data,setData]=useState({
      name:"",
      email: "",
      password: "",
      passwordrep:"",
      roleId: 1,
      countryCode: "",
      mobileNumber: "",
      roleName: "",
      // tnc:false,
    })
    let history = useHistory();
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleToogle = (e) => {
      setData({ ...data, [e.target.name]: e.target.checked });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if(data.password===data.passwordrep){
        console.log(data.email  , data.password !=="")
      if(data.email !== "" && data.password !==""){
      let registerData={
        email: data.email,
      password: data.password,
      roleId: 1,
      countryCode: data.countryCode,
      mobileNumber: data.mobileNumber,
      roleName: data.roleName
      }
      dispatch(signupAction(registerData));
      history.push("/login")
    }else(Utils.showAlert(2,"Email and password cannot be empty"))
  } else(Utils.showAlert(2,"Password does not match"))
    }
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 g-0">
          <Col lg="5" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg1 + ")",
                      }}/>
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
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }}/>
                    <div className="slider-content">
                      <h3>Scalable, Modular, Consistent</h3>
                      <p>
                        Easily exclude the components you don't require.
                        Lightweight, consistent Bootstrap based styles across
                        all elements and components
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: "url(" + bg2 + ")",
                      }}/>
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
            <Col lg="7" md="12" className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4>
                  <div>Welcome,</div>
                  <span> 
                    It only takes a{" "}
                    <span className="text-success">few seconds</span> to create
                    your account
                  </span>
                </h4>
                <div>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">
                            <span className="text-danger">*</span><span className="textClassLabel">Email</span> 
                          </Label>
                          <Input type="email" name="email" value={data.email} onChange={handleChange}  id="exampleEmail" placeholder="Email here..."/>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label  className="textClassLabel" for="exampleName">Name</Label>
                          <Input type="text" name="name" value={data.name} onChange={handleChange} id="exampleName" placeholder="Name here..."/>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">
                            <span className="text-danger">*</span><span className="textClassLabel">Password</span> 
                          </Label>
                          <Input type="password" name="password" value={data.password} onChange={handleChange} id="examplePassword" placeholder="Password here..."/>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePasswordRep">
                            <span className="text-danger">*</span> <span className="textClassLabel">Repeat Password</span>
                            
                          </Label>
                          <Input type="password" name="passwordrep" value={data.passwordrep} onChange={handleChange} id="examplePasswordRep" placeholder="Repeat Password here..."/>
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <FormGroup className="mt-3" check>
                    <Checkbox
                                  type="Checkbox"
                                  checked={data.tnc}
                                  className="checkBox"
                                  onClick={(e) => handleToogle(e)}
                                />
                      <Label for="exampleCheck" check>
                        I Accept our{" "}
                        <a className="btn-link">
                          Terms and Conditions
                        </a>
                      </Label>
                    </FormGroup> */}
                    <div className="mt-4 d-flex align-items-center">
                      <h5 className="mb-0 text-primaryclass">
                        Already have an account?{" "}
                        <a onClick={() => history.push("/login")} className="text-primary">
                          Sign in
                        </a>
                      </h5>
                      <div className="ms-auto">
                        <Button color="primary" type="submit" className="btn-wide btn-shadow btn-hover-shine" size="small">
                          Create Account
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
  }
  export default Register
