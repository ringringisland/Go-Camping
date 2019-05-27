import React from "react";
// import { BrowserRouter as NavLink } from "react-router-dom";
import "./Food.css";
import "../../components/Default.css";
//react-number-format
import NumberFormat from 'react-number-format';

import { 
  Row,
  Col,
  Container,
  Table,
  Form,
  Image,
  ButtonToolbar,
  Button 
} from "react-bootstrap";
// import FoodOrder01 from "../../components/FoodOrder01";
import FoodOrder02 from "../../components/FoodOrder02";
import FoodOrder03 from "../../components/FoodOrder03";

class FoodOrderP1 extends React.Component {
  // TODO: 接收傳進來的該筆資料(ex const {match} = this.props)
  constructor(props) {
    super(props);
    this.state = {
      //props.match.params.id抓Router的ID
      salepage_id: props.match.params.id,
      //這裡還要用fetch拿到的是物件,所以預設就是{},不是[]
      salepageData: {},
      order_num: 1,
      price: 0,
      total: 0,
      // 要秀第幾頁
      showOrder: 1,
      // 最後要串 order03 送出的資料      
      saleorder_id: 0,
      saleorder_memid: 0,
      saleorder_memname: "",
      saleorder_memtel: "",
      saleorder_memmail: "",
      saleorder_memtaddress: "",
      saleorder_salepageimage: "",
      saleorder_salepageid: "",
      saleorder_salepagename: "",
      saleorder_number: 1,
      saleorder_total: 0,
      saleorder_payment: "",
      saleorder_paycode: "144 850 392 495",
      saleorder_paydate: ""     
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeNum = this.changeNum.bind(this);
    this.goP1 = this.goP1.bind(this);
    this.goP2 = this.goP2.bind(this);
    this.goP3 = this.goP3.bind(this);
  }

  changeNum(event) {
    this.setState({
    order_num: event.target.value,
    total: event.target.value * this.state.price
    })
  };

  // 在父層宣告 Method 可供下面的子層傳入, 讓子層可以呼叫到父層的 Method 
  goP1() {
    this.setState({
      showOrder: 1,
    })
  }

  goP2() {
    this.setState((state, props) => ({
      showOrder: 2,
      saleorder_salepageid : state.salepage_id,
      saleorder_salepageimage : state.salepageData.salepage_image, 
      saleorder_salepagename : state.salepageData.salepage_name,
      saleorder_number : state.order_num,
      saleorder_total : state.total,       
    }))    
  }

  goP3() {    
    this.postOrderData();        
  }

  //因為程式太多,所以在這裡簡化（原本的在下面fetchData(){}）
  componentDidMount() {
    this.fetchData();    
  }

  fetchData() {
    const url = "http://localhost:5555/salepage/" + this.state.salepage_id;
    return fetch(url)
      .then(response => response.json())
      .then(parsedJSON => this.setState({ 
                                          salepageData: parsedJSON,
                                          price: parsedJSON.salepage_price,
                                          total: parsedJSON.salepage_price 
                                        }))
      .catch(error => console.log(error));
  }

  handleInputChange = event => {
    let value = event.target.value
    const name = event.target.name     
    this.setState({ [name]: value })
  }

  postOrderData(){
    this.setState({saleorder_id: new Date().getTime()},function(){
      var orderData = {
          "id": this.state.saleorder_id,      
          "saleorder_memid": localStorage.getItem("mem_id"),
          "saleorder_memname": this.state.saleorder_memname,
          "saleorder_memtel": this.state.saleorder_memtel,
          "saleorder_memmail": this.state.saleorder_memmail,
          "saleorder_memtaddress": localStorage.getItem("mem_address"),
          "saleorder_salepageid": this.state.saleorder_salepageid,
          "saleorder_salepageimage": this.state.saleorder_salepageimage,
          "saleorder_salepagename": this.state.saleorder_salepagename,
          "saleorder_number": this.state.saleorder_number,
          "saleorder_total": this.state.saleorder_total,
          "saleorder_payment": this.state.saleorder_payment,
          "saleorder_paycode": this.state.saleorder_paycode,
          "saleorder_paydate": this.state.saleorder_paydate
        }
    
        const url = "http://localhost:5555/saleorder";
        return fetch(url,
          {
            method: "POST",
            headers: new Headers({
              "Accept": "application/json",
              "Content-Type": "application/json"
            }),
            body: JSON.stringify(orderData)
          })
          .then(response => response.json())
          // 確定已經新增訂單進 json 後再轉到第三步驟 (callback function)
          .then(parsedJSON => this.setState({ showOrder: 3}))
          .catch(error => console.log(error));
    })    
  }

  //宣染開始 <FoodDetailsBt data={this.state.salepageData} />
  render() {    
    return (
      <>
      
      {/* {this.state.salepage_id} */}
      {/* {this.state.salepageData.salepage_name} */}
      {/* 判斷 showOrder 來顯示要秀哪一頁 */}
      {/* 父層的 this.state.showP2 來判斷要不要顯示 FoodOrder01 或是 FoodOrder02 */}
      {/* 進入訂單第一步 訂單明細*/}
      {this.state.showOrder === 1 &&
      <Container className="">
        <Container className="mt-1">
          <Row className="mt-5">
            <Col>
              <div className=" forder01-title fs-32">訂購明細</div>
            </Col>
          </Row>
        </Container>
        {/* 訂購清單 */}
        <Container className="mt-1">
          <Row className="mt-3">
            <Col>
              <div className="ground fs-24">訂購清單</div>
            </Col>
          </Row>
        </Container>
        {/* 顯示清單 */}
        <Container className="mt-1 ">
          <Row className="">
            <Col>
              <Table bordered>
                <thead>
                  <tr className="text-center">
                    <th style={{ width: "20%" }}>商品圖片</th>
                    <th style={{ width: "30%" }}>商品名稱</th>
                    <th style={{ width: "10%" }}>單價</th>
                    <th style={{ width: "10%" }}>數量</th>
                    <th style={{ width: "10%" }}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center justify-content-center">
                    <td>
                      {" "}
                      <Image
                        style={{ width: "100%" }}
                        src={this.state.salepageData.salepage_image}
                        rounded
                      />
                    </td>
                    <td>{this.state.salepageData.salepage_name}</td>
                    <td>
                    <p><NumberFormat value={this.state.salepageData.salepage_price} displayType={'text'} thousandSeparator={true} prefix={'NT$'} /></p>
                    </td>
                    <td>
                      <div className="">
                        <span className="fs-14" />
                        <input
                          min="1"                                                    
                          value={this.state.order_num}
                          onChange={this.changeNum}
                          id="order_num"
                          type="number"
                          className="form-control text-center"
                          // placeholder="1"
                        />                                        
                      </div>
                    </td>
                    <td>刪除</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        {/* 總額 */}
        <Container className="forder01-totalcon">
          <Row>
            <Col style={{ width: "100%" }}>
              <div className="forder01-total">
                <p>共 <span className="watermelon"> {this.state.order_num} </span> 項商品</p>
                <p>總金額 <NumberFormat className="watermelon" value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'NT$'} /></p>
              </div>
              <p className="fs-14">
                備註：食材皆可於指定日期與時間送往指定地點
              </p>
            </Col>
          </Row>
        </Container>
        {/* 服務條款 */}
        <Container className="mt-1">
          <Row className="mt-5">
            <Col>
              <div className="ground fs-24">服務條款</div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <div style={{ width: "100%" }}>
                <div className="forder01-ser">
                  <p>
                    一、會員服務條款<br/>
                    1.本會員服務條款所稱之「會員」，為依照本站所定之加入會員程序加入完成並通過認證者。<br/>
                    2.當您使用本站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。<br/>
                    3.本站保留有審核加入會員資格之權利，另外已加入會員者，本站亦保留有解除其會員資格之權利。<br/>
                    4.本會員服務條款之修訂，適用於所有會員，當本站修訂本服務條款時，將於本站上公告。<br/>
                    二、隱私權保護<br/>
                    尊重並依據本網站「隱私權保護聲明」保護您的隱私(請參閱「隱私權保護聲明」條款)。<br/>
                    三、會員<br/>
                    1.使用本站所提供之會員服務時，於加入會員時所登錄之帳號及密碼使用之。<br/>
                    2.會員須善盡帳號及密碼的使用與管理之責任。對於使用該會員之帳號及密碼(無關於會員本身或其他人)利用本站服務所造成或衍生之所有行為及結果，會員須自行負擔全部責任。<br/>
                    3.會員之帳號及密碼遺失，或發現無故遭第三者盜用時，應立即通知本站連絡掛失，因未即時通知，導致本站無法有效防止及修改時，所造成的所有損失，會員應自負全責。<br/>
                    4.每次結束使用本服務，執行會員之登出並關閉視窗，以確保您的會員權益。<br/>
                    5.盜用第三者會員之帳號及密碼，導致第三者或本公司遭其他第三人或行政機關之調查或追訴時，第三者會員或本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。<br/>
                    四、會員登錄資料<br/>
                    1.會員登錄資料須提供您本人正確、最新及完整的資料。<br/>
                    2.會員登錄資料不得有偽造、不實等之情事(ex如個人資料及信用卡資料)，一經發現本公司可拒絕其加入會員資格之權利。並得以暫停或終止其會員資格，若違反中華民國相關法律，亦將依法追究。<br/>
                    3.會員基本資料(ex:住址，電話及其他登錄資料)有變更時，請不定期更新相關個人資料，確保其正確及完整性。若您提供的資料有錯誤或不符等現象，本網站有權暫停或終止您的帳號，並拒絕您繼續使用本服務。<br/>
                    4.未經會員本人同意，本公司原則上不會將涉及個人隱私之資料開示給第三者，唯資料共用原則...等不在此限(請參閱本站「隱私權保護聲明」相關規定)。<br/>
                    5.會員應妥善保管密碼，不可將密碼洩露或提供給他人知道或使用；以同一個會員身分證字號和密碼使用本服務所進行的所有行為，都將被認為是該會員本人和密碼持有人的行為。<br/>
                    6.會員如果發現或懷疑有第三人使用其會員身分證字號或密碼，應該立即通知本公司，採取必要的必要的防範措施。但上述通知不得解釋為本公司對會員負有任何形式之賠償或補償之責任或義務。<br/>
                    五、使用行為<br/>
                    1.您使用本服務之一切行為必須符合當地或國際相關法令規範；對於使用者的一切行為，您須自行負擔全部責任。<br/>
                    2.您同意絕不為非法之目的或以非法方式使用本服務，與確實遵守中華民國相關法規及網際網路之國際慣例，並保證不得利用本服務從事侵害他人權益或違法之行為。<br/>
                    3.您於使用本站會員服務時應遵守以下限制：<br/>
                    a)有損他人人格或商標權、著作權等智慧財產權或其他權利內容。<br/>
                    b)使用違反公共秩序或善良風俗或其他不法之文字。<br/>
                    c)強烈政治、宗教色彩的偏激言論。<br/>
                    d)未經本公司許可，不得利用本服務或本網站所提供其他資源，包括但不限於圖文資料庫、編寫製作網頁之軟體等，從事任何商業交易行為，或招攬廣告商或贊助人。<br/>
                    e)其他違反本站「會員服務條款」的內容。 六、本公司專有權利<br/>
                    1.本服務所載，或本服務所連結之一切軟體或內容，或本公司之廣告商或合夥人所提供之內容，均受其著作權或其他專有權利或法律所保障。<br/>
                    2.當您傳輸資料至本公司提供之服務時，您即同意此一資料為全開放性(任何人均可瀏覽)。您授權並許可本公司得以重製、修飾、改編或以其他形式使用該內容之全部或一部分，及利用該內容製作衍生著作。衍生著作之著作權悉歸本公司所有。<br/>
                    3.<br/>
                    本公司同意除依本使用條款約定，將前述您的資料及衍生著作置於本網站供網路使用者瀏覽，以及本公司所屬相關媒體外，絕不非法轉供其他直接營利目的或侵害您的權利之使用。<br/>
                    4.所有網頁之頁面出現之廣告看板與活動訊息，所有權及經營權均為本公司所有，使用者除事先取得本公司同意外，不得自行使用所有訊息。<br/>
                    5.會員同意並授權本網站，得為提供個人化服務或相關加值服務之目的，提供所需之會員資料給合作單位(第三者)做約定範圍內之運用，如會員不同意將其資料列於合作單位(第三者)產品或服務名單內，可通知本網站於名單中刪除其資料，並同時放棄其本網站以外之購物優惠或獲獎權利。<br/>
                    6.同時為提供行銷、市場分析、統計或研究、或為提供會員個人化服務或加值服務之目的，會員同意本公司、或本公司之策略合作夥伴，得記錄、保存、並利用會員在本網站所留存或產生之資料及記錄，同時在不揭露各該資料之情形下得公開或使用統計資料。<br/>
                    7.對於會員所登錄之個人資料，會員同意本網站得於合理之範圍內蒐集、處理、保存、傳遞及使用該等資料，以提供使用者其他資訊或服務、或作成會員統計資料、或進行關於網路行為之調查或行銷研究。<br/>
                    七、終止授權<br/>
                    您使用本服務之行為若有任何違反法令或本使用條款或危害本網站或第三者權益之虞時，本公司有權不經告知您，立即暫時或永久終止您使用本服務之授權。<br/>
                    八、免責事項<br/>
                    1.下列情形發生時，本網站有權可以停止、中斷提供本服務：<br/>
                    a)對本服務相關軟硬體設備進行更換、升級、保養或施工時。<br/>
                    b)發生突發性之電子通信設備故障時。<br/>
                    c)天災或其他不可抗力之因素致使本網站無法提供服務時。<br/>
                    2.本公司對於使用者在使用本服務或使用本服務所致生之任何直接、間接、衍生之財產或非財產之損害，不負賠償責任。<br/>
                    3.使用者對於上傳留言之文字、圖片及其它資料，應自行備份；本公司對於任何原因導致其內容全部或一部之滅失、毀損，不負任何責任。<br/>
                    4.本公司對使用本服務之用途或所產生的結果，不負任何保證責任，亦不保證與本服務相關之軟體無缺失或會予以修正。<br/>
                    5.對於您在本站中的所有言論、意見或行為僅代表您個人；不代表本公司的立場，本公司不負任何責任。本公司對於使用者所自稱之身分，不擔保其正確性。<br/>
                    6.本公司無須對發生於本服務或透過本服務所涉及之任何恐嚇、誹謗、淫穢或其他一切不法行為對您或任何人負責。<br/>
                    7.對於您透過本服務所購買或取得，或透過本公司之贊助者或廣告商所刊登、銷售或交付之任何貨品或服務，您應自行承擔其可能風險或依法向商品或服務提供者交涉求償，與本公司完全無關，本公司均不負任何責任。<br/>
                    九、修改權<br/>
                    1.當您開始使用本服務時，即表示您已充分閱讀、瞭解與同意接受本條款之內容。本公司有權於任何時間修改與變更本條款之內容，並將不個別通知會員，建議您定期查閱本服務條款。如您於本條款修改與變更後仍繼續使用本服務，則視為您已閱讀、瞭解與同意接受本條款修改或變更。<br/>
                    2.本公司有權暫時或永久修改或中止提供本服務給您，您不得因此要求任何賠償。<br/>
                    十、智慧財產權的保護<br/>
                    1.本網站所使用之軟體、程式及網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網頁設計，均由本網站或其他權利人依法擁有其智慧財產權，包括但不限於商標權、專利權、著作權、營業秘密與專有技術等。<br/>
                    2.任何人不得逕行使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。如欲引用或轉載前述之軟體、程式或網站內容，必須依法取得本網站或其他權利人的事前書面同意。如有違反之情事，您應對本網站或其他權利人負損害賠償責任（包括但不限於訴訟費用及律師費用等）。<br/>
                    十一、其他規定<br/>
                    1.本網站使用者條約，免責之內容，亦構成本使用條款之一部分。<br/>
                    2.凡因使用本服務所生之爭執，均以台灣臺中地方法院為第一審管轄法院。<br/>
                    3.若因您使用本服務之任何行為，導致本公司遭第三人或行政機關之調查或追訴時，本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。<br/>
                    4.本公司針對可預知之軟硬體維護工作，有可能導致系統中斷或是暫停者，將會於該狀況發生前，以適當之方式告知會員。<br/>
                    十二、會員身份終止與本公司通知之義務：<br/>
                    1.本公司具有更改各項服務內容或終止任一會員帳戶服務之權利。<br/>
                    2.若會員決定終止本公司會員資格，可直接以電子郵件的方式通知本公司或是由本公司所提供之機制進行取消，本公司將儘快註銷您的會員資料。<br/>
                    3.會員有通知取消本公司會員資格之義務，並自停止本公司會員身份之日起（以本公司電子郵件發出日期為準），喪失所有本服務所提供之優惠及權益。<br/>
                    4.為避免惡意情事發生致使會員應享權益損失，當會員通知本公司停止會員身份時，本公司將再次以電子郵件確認無誤後，再進行註銷會員資格。<br/>
                  </p>
                </div>
                <Form.Group controlId="formBasicChecbox">
                  <Form.Check
                    type="checkbox"
                    label="我已閱讀並同意上述條款規則。"
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Container>
        {/* 送出或返回button */}
        <Container className="forder01-btncon">
          <Row>
            <Col>
              {/* justify-content-between */}
              <ButtonToolbar className="justify-content-end">
                <Button
                  className="bg-food-default forder-btn mr-2 "
                  style={{ width: "30%" }}
                  sm={"block"}
                  href={"/Food/FoodDetails/" + this.state.salepageData.id}
                >
                  返回食材列表
                </Button>
                <Button
                  className="bg-sunshine food-default forder-btn"
                  style={{ width: "30%" }}
                  sm={"block"}
                  onClick={this.goP2}
                >
                  下一步，填寫資訊
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Container>
      </Container>
      }        
      {this.state.showOrder === 2 &&  
       <FoodOrder02 order={this.state.salepageData} 
                    goP1={this.goP1} 
                    goP3={this.goP3}
                    handleInputChange={this.handleInputChange}/>
      }
      {this.state.showOrder === 3 &&  
       <FoodOrder03 orderid={this.state.saleorder_id}/>
      }
      </>
    );
  }
}

export default FoodOrderP1;

