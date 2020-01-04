import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row"> 
          <div className="row">
            <h5 className="landing-header">
              Welcome to Nostra.gg!
            </h5>
            <p className="flow-text grey-text text-darken-1 landing-sub-header">
              Use strategy and game knowledge to predict wins, bank gold, and beat your friends.
              <br></ br>
              Login or create an account below to play.
            </p>
          </div> 
          <div className="col s12 center-align">          
            <div className="row">
              <div className="col s6">
                <div className="row tournament-landing-header">
                  <div className="col s3 offset-s4">
                    <img className="tournament-landing-img" src={process.env.PUBLIC_URL + "/lec/lec_logo.png"} />
                  </div>
                </div>
                <div className="divider"></div>
                <table className="striped">
                  <tr key="row_1">
                    <td className="right-align">
                      <img className="landing-row1-img" src={process.env.PUBLIC_URL + "/lec/og_large.png"} />
                    </td>
                    <td className="right-align">
                      <img className="landing-row1-img" src={process.env.PUBLIC_URL + "/lec/s04_large.png"} />
                    </td>
                    <td className="right-align">
                      <img className="landing-row1-img" src={process.env.PUBLIC_URL + "/lec/fnc_large.png"} />
                    </td>
                    <td className="right-align">
                      <img className="landing-row1-img" src={process.env.PUBLIC_URL + "/lec/g2_large.png"} />
                    </td>
                  </tr>
                  <tr key="row_2">
                    <td></td>
                    <td className="right-align">
                      <img className="landing-row2-img" src={process.env.PUBLIC_URL + "/lec/ml_large.png"} />
                    </td>
                    <td className="right-align">
                      <img className="landing-row2-img" src={process.env.PUBLIC_URL + "/lec/msf_large.png"} />
                    </td>
                    <td className="right-align">
                      <img className="landing-row2-img" src={process.env.PUBLIC_URL + "/lec/sk_large.png"} />
                    </td>
                  </tr>
                  <tr key="row_3">
                    <td></td>
                    <td></td>
                    <td className="right-align">
                      <img className="landing-row3-img" src={process.env.PUBLIC_URL + "/lec/rge_large.png"} />
                    </td>
                    <td className="right-align">
                      <img className="landing-row3-img" src={process.env.PUBLIC_URL + "/lec/xl_large.png"} />
                    </td>
                  </tr>
                  <tr key="row_4">
                    <td></td>
                    <td>
                      <div className="col s6">
                        <Link
                          to="/register"
                          style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                          }}
                          className="btn btn-flat waves effect waves-light hoverable nostra-button">
                            Register
                          </Link>
                      </div>
                    </td>
                    <td></td>
                    <td className="right-align">
                      <img className="landing-row4-img" src={process.env.PUBLIC_URL + "/lec/vit_large.png"} />
                    </td>
                  </tr>
                </table>
              </div>
              <div className="col s6 landing-table-container">
                <div className="row tournament-landing-header">
                  <div className="col s3 offset-s1">
                    <img className="tournament-landing-img" src={process.env.PUBLIC_URL + "/lcs/lcs_logo.png"} />
                  </div>
                </div>  
                <div className="divider"></div>
                <table className="striped">
                  <tr key="row_1">
                    <td>
                      <img className="landing-row1-img" src={process.env.PUBLIC_URL + "/lcs/100t_large.png"} />
                    </td>
                    <td>
                      <img className="landing-row1-img" src={process.env.PUBLIC_URL + "/lcs/c9_small.png"} />
                    </td>
                    <td>
                      <img className="landing-row1-img" src={process.env.PUBLIC_URL + "/lcs/clg_small.png"} />
                    </td>
                    <td>
                      <img className="landing-row1-img" src={process.env.PUBLIC_URL + "/lcs/liquid_small.png"} />
                    </td>
                  </tr>
                  <tr key="row_2">
                    <td className="left-align">
                      <img className="landing-row2-img" src={process.env.PUBLIC_URL + "/lcs/tsm_small.png"} />
                    </td>
                    <td className="left-align">
                      <img className="landing-row2-img" src={process.env.PUBLIC_URL + "/lcs/eg_large.png"} />
                    </td>
                    <td className="left-align">
                      <img className="landing-row2-img" src={process.env.PUBLIC_URL + "/lcs/imt_small.png"} />
                    </td>
                    <td></td>
                  </tr>
                  <tr key="row_3">
                    <td className="left-align">
                      <img className="landing-row3-img" src={process.env.PUBLIC_URL + "/lcs/fq_large.png"} />
                    </td>
                    <td className="left-align">
                      <img className="landing-row3-img" src={process.env.PUBLIC_URL + "/lcs/ggs_large.png"} />
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr key="row_4"> 
                    <td className="left-align">
                      <img className="landing-row4-img" src={process.env.PUBLIC_URL + "/lcs/dig_large.png"} />
                    </td>
                    <td></td>
                    <td>
                      <div className="col s6">
                        <Link
                          to="/login"
                          style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                          }}
                          className="btn btn-flat waves-effect white black-text">
                            Log In
                          </Link>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </table>
                
              </div>
              
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default Landing;