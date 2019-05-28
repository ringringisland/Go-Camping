import React from "react";
import "./Food.css";
import "../../components/Default.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import FoodDetailsBread from "../../components/FoodDetailsBread";
import FoodDetailsTop from "../../components/FoodDetailsTop";
import FoodDetailsMd from "../../components/FoodDetailsMd";
import FoodDetailsBt from "../../components/FoodDetailsBt";

class FoodDetails extends React.Component {
  // TODO: 接收傳進來的該筆資料(ex const {match} = this.props)
  constructor(props) {
    super(props);
    this.state = {
      //props.match.params.id抓Router的ID
      salepage_id: props.match.params.id,
      //這裡還要用fetch拿到的是物件,所以預設就是{},不是[]
      salepageData: {},
      // 收藏--> 1.先建立一個 saleloveData 陣列
      saleloveData: [],
      //選擇數量
      optionNumber: 1,
      //預設登入狀態為false
      logined: false
    };
    this.AddSaleLove = this.AddSaleLove.bind(this);
    this.fetchSaleloveData = this.fetchSaleloveData.bind(this);
    this.optionNumber = this.optionNumber.bind(this);
  }

  //因為程式太多,所以在這裡簡化（原本的在下面fetchData(){}）
  componentDidMount() {
    this.fetchData();
    // 收藏--> 2.取得 salelove 的資料
    this.fetchSaleloveData();
  }
  //抓到商品資訊
  fetchData() {
    const url = "http://localhost:5555/salepage/" + this.state.salepage_id;
    return fetch(url)
      .then(response => response.json())
      .then(parsedJSON => this.setState({ salepageData: parsedJSON }))
      .catch(error => console.log(error));
  }

  fetchSaleloveData() {
    const url = "http://localhost:5555/salelove";
    return fetch(url)
      .then(response => response.json())
      .then(parsedJSON =>
        this.setState((state, props) => ({
          // 收藏--> 3.取得 salelove 的資料後用filter比對 mem_id 與 salepage_id
          saleloveData: parsedJSON.filter(function(data) {
            return (
              data.salelove_memid === localStorage.getItem("mem_id") &&
              data.salelove_salepageid === state.salepage_id
            );
          })
        }))
      )
      .catch(error => console.log(error));
  }

  //選擇數量
  optionNumber(event) {
    this.setState({
      optionNumber: event.target.value
    });
  }

  // 收藏--> 4. 按下收藏按鈕的觸發事件,因為異步會導致判斷錯誤，所以需要用async await語法,變成同步
  async AddSaleLove() {
    //有收藏length會大於0,來判斷是否已收藏,fetch的詳細作法在下面
    var count = this.state.saleloveData.length;
    const mem_account = localStorage.getItem("mem_account")

        if (mem_account) {
            await this.setState({ logined: true })
        }


    if (count > 0 ) {
      //// 已有收藏, 刪除收藏
      await this.deleteSaleloveData();
      //// 重新取得 Salelove
      await this.fetchSaleloveData();
    } else {
      //// 未有收藏, 新增收藏
      await this.addSaleloveData();
      //// 重新取得 Salelove
      await this.fetchSaleloveData();
    }
  }

//轉向登入頁
 toLoginPage = () => {
        return (
            <Redirect to="/Login" />
        )
    }
  
  toFoodOrderp1 = () =>{
    return(
      <Redirect to={"/Food/FoodDetails/FoodOrderP1/" + this.state.salepageData.id} />
    )
  }

  //加入收藏
  addSaleloveData() {
    const url = "http://localhost:5555/salelove";
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      // 收藏--> 把需要用到的資料POST到JSON,至少要id,會員id,產品id
      body: JSON.stringify({
        id: new Date().getTime(),
        salelove_memid: localStorage.getItem("mem_id"),
        salelove_salepageid: this.state.salepageData.id,
        salelove_salepageimage: this.state.salepageData.salepage_image,
        salelove_salepagename: this.state.salepageData.salepage_name,
        salelove_salepageprice: this.state.salepageData.salepage_price,
        salelove_salepagesuggestprice: this.state.salepageData
          .salepage_suggestprice
      })
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  }
  //刪除收藏
  deleteSaleloveData() {
    // 收藏--> 取得 [] 的第一筆資料 (index=0)的id,一個會員只會在此產品有一筆資料
    const url =
      "http://localhost:5555/salelove/" + this.state.saleloveData[0].id;
    return fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  宣染開始;
  render() {
    // console.log(this.state.salepage_id)
    return (
      <>
        {/* {this.state.salepageData.salepage_name} */}
        <Container className="FoodDetails">
          <Row className="container">
            <Col>
              <FoodDetailsBread />
              {/* data是自己命名,是要給子層沿用下去的 */}
              <FoodDetailsTop
                data={this.state.salepageData}
                // 收藏-->
                saleloveData={this.state.saleloveData}
                AddSaleLove={this.AddSaleLove}
                //選擇商品數量
                optionNumber={this.state.optionNumber}
                ifLogin={this.ifLogin}
              />
            </Col>
          </Row>
          <Row className="">
            <Col>
              <FoodDetailsMd data={this.state.salepageData} />
              <FoodDetailsBt data={this.state.salepageData} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default FoodDetails;
