import React from "react"
import Du4e from "@jonbiro/0xsu-js-lib"
// import logo from './logo.svg'
import "./App.css"
import Navbar from "react-bootstrap/Navbar"
import { Badge, Container, Form, Modal, Button, Col } from "react-bootstrap"

class App extends React.Component {
  state = {
    shortURL: "",
    copied: null,
    urls: [],
    show: false
  };

  constructor(props) {
    super(props);
    this.shortenUrl = this.shortenUrl.bind(this);
    this.copy = this.copy.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.viewAcct = this.viewAcct.bind(this);
    this.shortener = new Du4e();
    this.shortener.onTxSend = txid => {
      console.log("TXID", txid);
      this.setState({ shortURL: "Waiting for tx to confirm..." });
    };
  }

  copy() {
    let el = document.createElement("textarea");
    el.value = this.state.longURL;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.setState({ copied: true });
  }

  handleClose(){
    this.setState({show: false})
  }

  viewAcct() {
    this.shortener.listOfUrls(list => {
      this.setState({ urls: list });
    });
  }

  shortenUrl(evt) {
    evt.preventDefault();
    this.shortener.shortenUrl(this.refs.short.value, { cb: () => {} });
  }

  render() {
    let { shortURL } = this.state;
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Collapse className="justify-content-end">
            <a href="#" onClick={this.viewAcct}>
              Account
            </a>
          </Navbar.Collapse>
        </Navbar>
        <Container className="text-center">
          <br />
          <h1 className="App">0xSU.co</h1>
          <p>
            Your friendly neighborhood decentralized Ethereum Short URL
            maker
          </p>
          <br />
          <form onSubmit={this.shortenUrl}>
            <Form.Row>
              <Col sm={9}>
                <Form.Control
                  size="lg"
                  type="text"
                  ref="short"
                  placeholder="Paste your long URL here"
                />
              </Col>
              <Col sm={3}>
                <Button variant="primary" size="lg" type="submit">
                  Shorten
                </Button>
              </Col>
            </Form.Row>
          </form>

          <div className={shortURL ? "" : "hidden"}>
            <br />
            <br />
            <span>
              {shortURL.startsWith("Waiting")
                ? shortURL
                : `https://0xSU.com/${shortURL}`}
              &nbsp;
            </span>
            {!shortURL.startsWith("Waiting") && (
              <Badge variant="success" onClick={this.copy} className="copy">
                {this.state.copied ? "Copied!" : "Copy"}
              </Badge>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />

          <a href="https://github.com/du4e">Learn more / source code</a>
        </Container>
        <Modal
          show={this.state.urls.length > 0 || this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Your Shortened URLs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.urls.map(x => {
              return (<p key={x}>
                <a href={`https://0xsu.co/${x}`}>{x}</a>
              </p>);
            })}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default App
