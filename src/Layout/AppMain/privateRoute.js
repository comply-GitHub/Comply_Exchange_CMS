import { Link, Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lazy } from 'react';

//  const PrivateRoute =({ children }) => {
//     const location = useLocation();
//     //  const { isLoggedIn } = useSelector(state => state.auth);
//     let isLoggedIn=false;
//     if(localStorage.getItem("accessToken")){
//         isLoggedIn=true;
//     }
//      if (!isLoggedIn) {
//      return <Link to="/" state={{ from: location }} />
//      }
//     return children;
// }

// export default PrivateRoute;

function PrivateRoute({ children, ...rest }) {
    const Pages = lazy(() => import("../../Administrator/Pages/Pages"));
    console.log(children,"CHILDERED")
    function isAuth(){
        if(localStorage.getItem("accessToken")){
           return true;
        }
        else return false;
    }
     
    return (
      <Route
        {...rest}
        render={() => {
          return isAuth() ? (children) : <Redirect to="/login" />;
        }}
      />
    );
  }
  
  export default PrivateRoute;