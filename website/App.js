import "./App.css";
import React, { useState, useEffect } from "react";
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import googleImg from "./get-it-on-google-play-badge.png";
import img2 from "./previewed/myproject-4.jpg";
import img3 from "./previewed/myproject.jpg";
import { Link } from "react-router-dom";

function App() {
  const [reducedNav, setReducedNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 990) {
        setReducedNav(true);
      } else {
        setReducedNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window]);

  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <nav
          class="navbar navbar-expand-lg bg-light"
          style={{ paddingBottom: "-20px" }}
        >
          {reducedNav === true && (
            <div class="container-fluid">
              <a
                class="navbar-brand"
                style={{
                  fontWeight: 700,
                  fontSize: "26px",
                  paddingLeft: "10%",
                }}
              >
                PlasticAway
              </a>

              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li
                    class="nav-item"
                    onClick={() => {
                      document
                        .getElementById("features-section")
                        .scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                  >
                    <a
                      class="nav-link active"
                      aria-current="page"
                      style={{ color: "black" }}
                    >
                      Features
                    </a>
                  </li>

                  <li
                    class="nav-item"
                    onClick={() => {
                      document.getElementById("faq").scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <a
                      class="nav-link active"
                      aria-current="page"
                      style={{ color: "black" }}
                    >
                      FAQ
                    </a>
                  </li>

                  <li
                    class="nav-item"
                    onClick={() => {
                      document.getElementById("contact-us").scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <a
                      class="nav-link active"
                      aria-current="page"
                      style={{ color: "black" }}
                    >
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://plasticaway.ghost.io"
                      className="nav-link active"
                      style={{ color: "black" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {reducedNav === false && (
            <div class="container-fluid" style={{ paddingLeft: "25%" }}>
              <a
                class="navbar-brand"
                style={{
                  fontWeight: 700,
                  fontSize: "26px",
                  marginLeft: "-15%",
                }}
              >
                PlasticAway
              </a>

              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul
                  class="navbar-nav me-auto mb-2 mb-lg-0"
                  style={{ textAlign: "center", display: "flex" }}
                >
                  <li
                    class="nav-item nowrap mx-auto"
                    onClick={() => {
                      document
                        .getElementById("features-section")
                        .scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                  >
                    <a
                      class="nav-link active"
                      aria-current="page"
                      style={{ color: "black" }}
                    >
                      Features
                    </a>
                  </li>

                  <li
                    class="nav-item nowrap mx-auto"
                    onClick={() => {
                      document.getElementById("faq").scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <a
                      class="nav-link active"
                      aria-current="page"
                      style={{ color: "black" }}
                    >
                      FAQ
                    </a>
                  </li>

                  <li
                    class="nav-item nowrap mx-auto"
                    onClick={() => {
                      document.getElementById("contact-us").scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <a
                      class="nav-link active"
                      aria-current="page"
                      style={{ color: "black" }}
                    >
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://plasticaway.ghost.io"
                      className="nav-link active"
                      style={{ color: "black" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </nav>

        <div class="container" style={{ padding: "0px 10%" }}>
          <div class="row box-sizing-border-box" style={{ paddingTop: "80px" }}>
            <div class="col-6 float-left">
              <div class="text-wrap" style={{ width: "80%" }}>
                <p class="fs-1 " style={{ fontWeight: 550 }}>
                  Live a plastic-free life!🚀
                </p>
              </div>

              <div class="text-wrap" style={{ width: "70%" }}>
                <p class="fs-4" style={{ fontWeight: 350 }}>
                  PlasticAway allows you to review and find high quality,{" "}
                  <strong>plastic-free products</strong>♻️
                </p>
                <p class="fs-6" style={{ fontWeight: 250 }}>
                  From household essentials to personal care products,
                  PlasticAway helps you make sustainable choices for a greener
                  future.
                </p>
                <p class="fs-6" style={{ fontWeight: 250 }}>
                  Join our community of environmentally conscious consumers and
                  start contributing to a plastic-free lifestyle today!
                </p>
              </div>

              <div style={{ paddingBottom: "10px" }}></div>
            </div>

            <div class="col-6 float-left">
              <img
                src={img2}
                class="img-fluid"
                alt="..."
                style={{
                  width: "200px",
                  height: "400px",
                  border: "0.75px solid black",
                  borderRadius: "10px",
                  marginLeft: "50px",
                }}
              />
            </div>
          </div>

          <div class="container d-flex justify-content-center">
            <a href="https://play.google.com/store/apps/details?id=com.jdev667.plasticaway">
              <img
                src={googleImg}
                class="img-fluid"
                alt="..."
                style={{
                  width: "300px",
                  height: "100px",
                  marginTop: "75px",
                }}
              />
            </a>
          </div>

          <div
            class="row"
            id="features-section"
            style={{ paddingTop: "100px" }}
          >
            <div class="col-sm">
              <p class="fs-5"> Review plastic-free products </p>
              <p
                class="fs-6 text-wrap"
                style={{ fontWeight: 250, marginTop: "-10px", width: "70%" }}
              >
                {" "}
                Share items with others and give your opinion{" "}
              </p>
            </div>
            <div class="col-sm">
              <p class="fs-5"> Find products reviewed by others </p>
              <p
                class="fs-6 text-wrap"
                style={{ fontWeight: 250, marginTop: "-10px", width: "70%" }}
              >
                {" "}
                Find that item you've always wanted a plastic-free version of{" "}
              </p>
            </div>
            <div class="col-sm">
              <p class="fs-5"> Live happier and healthier </p>
              <p
                class="fs-6 text-wrap"
                style={{ fontWeight: 250, marginTop: "-10px", width: "70%" }}
              >
                {" "}
                Contribute to a more sustainable and eco-friendly world{" "}
              </p>
            </div>
          </div>

          <div
            class="row box-sizing-border-box"
            style={{ paddingTop: "150px" }}
          >
            <div class="col-6 float-left">
              <img
                src={img3}
                class="img-fluid"
                alt="..."
                style={{
                  width: "200px",
                  height: "400px",
                  border: "0.75px solid black",
                  borderRadius: "10px",
                  marginLeft: "50px",
                }}
              />
            </div>

            <div class="col-6 float-right">
              <div class="text-wrap" style={{ width: "70%" }}>
                <p class="fs-3 " style={{ fontWeight: 350 }}>
                  Share quality and authentic plastic-free products with the
                  community🗣️
                </p>
              </div>

              <div class="text-wrap" style={{ width: "70%" }}>
                <p class="fs-5" style={{ fontWeight: 250 }}>
                  Help others achieve a more sustainable lifestyle by sharing
                  your opinions
                </p>
              </div>
            </div>
          </div>

          <div
            class="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div class="fs-4" id="faq" style={{ paddingTop: "50px" }}>
              {" "}
              FAQ{" "}
            </div>
          </div>

          <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
            <MDBAccordion alwaysOpen initialActive={1}>
              <MDBAccordionItem
                collapseId={1}
                headerTitle="What is PlasticAway?"
              >
                PlasticAway is a platform that allows users to search and add
                reviews for plastic-free products.
              </MDBAccordionItem>

              <MDBAccordionItem
                collapseId={2}
                headerTitle="Is there an IOS or Android app?"
              >
                There is currently only an Android app. We are working on an IOS
                app and will announce when it is released.
              </MDBAccordionItem>

              <MDBAccordionItem
                collapseId={3}
                headerTitle="I am having errors, how can I contact you?"
              >
                Click the contact us button below and we will get in touch as
                soon as possible.
              </MDBAccordionItem>

              <MDBAccordionItem
                collapseId={4}
                headerTitle="Why are affiliate links used?"
              >
                PlasticAway uses affiliate links to generate revenue. When a
                user clicks on an affiliate link, they are redirected to the
                product's website. If the user makes a purchase, PlasticAway
                receives a commission which is used to maintain the platform.
              </MDBAccordionItem>

              <MDBAccordionItem
                collapseId={5}
                headerTitle="How can I give you some feedback?"
              >
                Click the contact us button below. We always love receiving
                feedback!
              </MDBAccordionItem>
            </MDBAccordion>
          </MDBContainer>

          <div
            class="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div class="fs-4" id="contact-us" style={{ paddingTop: "100px" }}>
              {" "}
              Contact Us{" "}
            </div>
          </div>

          <div
            class="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div
              class="fs-6"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
            >
              {" "}
              If you have any questions, concerns or feedback, click the button
              below to get in touch{" "}
            </div>
          </div>

          <button
            class="btn btn-outline-dark"
            type="button"
            onClick={() =>
              (window.location.href = "mailto:plasticawaycontact@gmail.com")
            }
            style={{ display: "block", margin: "0 auto", maxWidth: "200px" }}
          >
            Send Us An Email!
          </button>

          <div style={{ paddingBottom: "200px" }}></div>
        </div>
      </div>
      <footer
        className="footer"
        style={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} PlasticAway. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
