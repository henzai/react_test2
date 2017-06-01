import * as React from "react";
import { Grid, Nav, NavItem, Navbar, Row, Col, InputGroup, Button, ButtonToolbar, Form, InputGroupClass, FormGroup, ControlLabel, FormControl, PageHeader } from 'react-bootstrap';
import * as ReactDOM from "react-dom";
import * as fs from 'fs';
const { BrowserWindow, dialog } = require('electron').remote;

class Root extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
        text: '',
    }
    this.readFile = this.readFile.bind(this);
    }
    openLoadFile() {
        const win = BrowserWindow.getFocusedWindow();
        const file = dialog.showOpenDialog(
            win,
            // どんなダイアログを出すかを指定するプロパティ
            {
                properties: ['openFile'],
                filters: [
                    {
                        name: 'Documents',
                        extensions: ['json']
                    }
                ]
            },);
        this.readFile(file);
    }
    /**
     * テキストを読み込み、テキストを入力エリアに設定する
     */
    readFile(path: string[]) {
        const currentPath: string = path.join();
        const that = this;
        fs.readFile(currentPath, function (error, text) {
            if (error != null) {
                alert('error : ' + error);
                return;
            }
            that.setState({ text: text.toString()});
        });
    }

    render() {
        return (
                <div>
                <PageHeader>Example page header <HeaderLine onClick={() => this.openLoadFile()}/></PageHeader>
                <Grid>
                    <Row>
                        <Col md={6} ><Editor value={this.state.text} /></Col>
                        <Col md={6} ><TableList /></Col>
                     </Row>
                </Grid>
                </div>
        );
    }
}

export class Editor extends React.Component<any,any> {
  render() {
    return (
        <div>{this.props.value}</div>
    );
  }
}

export class HeaderLine extends React.Component<any,any> {
  render() {
    return (
            <ButtonToolbar>
                {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                <Button onClick={() => this.props.onClick()}>Open</Button>
            </ButtonToolbar>
    );
  }
}

export class TableList extends React.Component<any,any> {
  render() {
    return (
        <div></div>
    );
  }
}

// ========================================

ReactDOM.render(
    <Root />,
    document.getElementById("app"),
);
