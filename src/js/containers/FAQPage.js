import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Empty } from 'antd';
import Loading from '../components/Loading'
import Loadable from '../components/loadable'
// import ThinkcarProblemPage from './ThinkcarProblemPage'
// import ThinkDiagProblemPage from './ThinkDiagProblemPage'

const ThinkcarProblemPage = Loadable(() => import('./ThinkcarProblemPage'));
const ThinkDiagProblemPage = Loadable(() => import('./ThinkDiagProblemPage'));

class FAQPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      newDetail: { detailList: [] },
      chooseModel: 'one'

    }

    this.initFun = this.initFun.bind(this)
    this.onClickModel = this.onClickModel.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)

  }

  initFun (_pr) {

  }
  onClickModel (_ty) {
    _ty !== this.state.chooseModel && this.setState({ chooseModel: _ty });
  }

  render () {
    let { isFetching, newDetail, chooseModel } = this.state;
    let { InitData } = this.props;
    const gutter = 16;

    return (
      <div className="tc-faq-page">
        <Row className=" think-car-home-price-img" style={{ padding: '0 10%', background: '#fff' }}>
          <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._faq.titleImg} />
        </Row>
        <Row className="tc-faq-info">
          <Col span={6} className="tc-mobile-col-widthmax">

            <ul className="tc-faq-info-left tc-mobile-clear-paddingbottom">
              <li className="tc-faq-info-left-title"><FormattedMessage id="tcFaqTitleModel" /></li>
              <li onClick={() => this.onClickModel('one')} className={chooseModel === 'one' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}><FormattedMessage id="tcThinkcar1and1s" /></li>
              <li onClick={() => this.onClickModel('two')} className={chooseModel === 'two' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}><FormattedMessage id="tcThinkdiag" /></li>
              {/* <li onClick={() => this.onClickModel('three')} className={chooseModel === 'three' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}>Thinkplus</li> */}
            </ul>
          </Col>
          <Col span={18} className="tc-faq-info-right tc-mobile-col-widthmax">

            {
              chooseModel === 'one' &&
              <ThinkcarProblemPage />
            }

            {
              chooseModel === 'two' &&
              <ThinkDiagProblemPage />
            }

            {
              chooseModel === 'three' &&
              <Empty />
            }
          </Col>
        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(FAQPage)
