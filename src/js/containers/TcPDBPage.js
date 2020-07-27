import React from 'react'
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import { browserRedirect } from '../../public/common'

export default class TcPDBPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      columns: [
        { title: 'Product', width: 100, clon: 4 },
        { title: 'Form', width: 70, clon: 2 },
        { title: 'Features', width: 100, clon: 4 },
        { title: 'Positioning', width: 70, clon: 2 },
        { title: 'Usage', width: 70, clon: 3 },
        { title: 'Customers', width: 70, clon: 3 },
        { title: 'System', width: 70, clon: 2 },
        { title: 'Protocol', width: 100, clon: 4 },

      ],
      dbdata: [
        {
          key: 'Product1',
          pname: { 'name': `THINKOBD 100`, 'url': '1.png' },
          pform: `portable hand-held tool`,
          pfeatures: `OBD II diagnostics;cost-effective;easy to carry and use`,
          ppositioning: `basic OBD diagnostic tool`,
          pusage: `smog check; OBD II related fault code`,
          pcustomers: `personal vehicle owner`,
          psystem: `OBD system`,
          pprotocol: {
            title: 'compatible with all vehicles after 1996 support OBD II protocol:',
            listData: ['ISO 14230-4(KWP2000)', 'ISO 15765-4(CAN)', 'ISO9141-2(iso)', 'ISO14229(uds)', 'SAEJ1850(VPW&PWM)']
          }
        },
        {
          key: 'Product2',
          pname: { 'name': `THINKCAR 1S`, 'url': '2.png' },
          pform: `dongle+App`,
          pfeatures: `OBD II diagnostics; full system diagnostics and code reading; real-time remote diagnostics(user side);black box; cost-effective;user friendly`,
          ppositioning: `intelligent diagnostic connector`,
          pusage: `smog check; vehicle health report; full system related fault code`,
          pcustomers: `personal vehicle owner; DIYers`,
          psystem: `full system scan`,
          pprotocol: {
            title: 'compatible with all vehicles after 2005 support OBD II protocol:',
            listData: ['ISO 14230-4(KWP2000)', 'ISO 15765-4(CAN)', 'ISO9141-2(iso)', 'ISO14229(uds)']
          }
        },
        {
          key: 'Product3',
          pname: { 'name': `THINKDRIVER`, 'url': '3.png' },
          pform: `dongle+App`,
          pfeatures: `OBD II diagnostics; full system diagnostics; read/clear code; data stream; vehicle owner community; cost-effective; user-friendly`,
          ppositioning: `intelligent diagnostic dongle`,
          pusage: `smog check; full system read/clear code; data stream`,
          pcustomers: `personal vehicle owner; DIYers`,
          psystem: `full system diagnostics; read/clear code`,
          pprotocol: {
            title: 'compatible with all vehicles after 1996 support OBD II protocol:',
            listData: ['ISO 14230-4(KWP2000)', 'ISO 15765-4(CAN)', 'ISO9141-2(iso)', 'ISO14229(uds)', 'SAEJ1850(VPW&PWM)']
          }
        },
        {
          key: 'Product4',
          pname: { 'name': `THINKDIAG`, 'url': '4.png' },
          pform: `dongle+App`,
          pfeatures: `OBD II diagnostics; 15 maintenance reset functions; full system diagnostics; remote diagnostics(technician side); vehicle owner community; cost-effective professional diagnostics; support more than 110 vehicle brands; easy to carry and user friendly `,
          ppositioning: `professional intelligent diagnostic connector`,
          pusage: `for professional diagnostics; maintenance reset`,
          pcustomers: `small and medium repair shops;  technician and mechanic; DIYers`,
          psystem: `manufacturer level diagnosis; full system detection and diagnosis`,
          pprotocol: {
            title: 'compatible with all vehicles after 1996 support OBD II protocol:',
            listData: ['ISO 14230-4(KWP2000)', 'ISO 15765-4(CAN)', 'ISO9141-2(iso)', 'ISO14229(uds)', 'SAEJ1850(VPW&PWM)']
          }
        },
        // {
        //   key: 'Product5',
        //   pname: { 'name': `THINKSCAN`, 'url': '5.png' },
        //   pform: `portable hand-held tool`,
        //   pfeatures: `OBD II diagnostics; diagnosis of 2-4 main electronic control systems; 2-4 special functions`,
        //   ppositioning: `portable diagnosis/maintenance tool`,
        //   pusage: `to meet the needs of vehicle owners  for basic diagnosis`,
        //   pcustomers: `personal vehicle owner; DIYers; technician and mechanic`,
        //   psystem: `support 2-4 systems`,
        //   pprotocol: {
        //     title: 'compatible with all vehicles after 1996 support OBD II protocol:',
        //     listData: ['ISO 14230-4(KWP2000)', 'ISO 15765-4(CAN)', 'ISO9141-2(iso)', 'ISO14229(uds)', 'SAEJ1850(VPW&PWM)']
        //   }
        // },
        // {
        //   key: 'Product6',
        //   pname: { 'name': `THINKCHECK`, 'url': '6.png' },
        //   pform: `hand-held tool`,
        //   pfeatures: `OBD II diagnostics; diagnosis of 8 main electronic control systems; 15 maintenance reset functions `,
        //   ppositioning: `more powerful portable diagnostic maintenance tool`,
        //   pusage: `to meet the needs of vehicle owners and technicians for diagnosis and maintenance`,
        //   pcustomers: `personal vehicle owner; DIYers; technician and mechanic`,
        //   psystem: `support 8 systems`,
        //   pprotocol: {
        //     title: 'compatible with all vehicles after 1996 support OBD II protocol:',
        //     listData: ['ISO 14230-4(KWP2000)', 'ISO 15765-4(CAN)', 'ISO9141-2(iso)', 'ISO14229(uds)', 'SAEJ1850(VPW&PWM)']
        //   }
        // },
        {
          key: 'Product7',
          pname: { 'name': `THINKPLUS`, 'url': '7.png' },
          pform: `hand-held device`,
          pfeatures: `OBD II diagnostics; full system diagnostics; professional artificial intelligent product`,
          ppositioning: `quick scan detection tool`,
          pusage: `for quick diagnostics and generate a report`,
          pcustomers: `Industry users with automotive diagnostics needs `,
          psystem: `support full system scan report`,
          pprotocol: {
            title: 'compatible with all vehicles after 1996 support OBD II protocol:',
            listData: ['ISO 14230-4(KWP2000)', 'ISO 15765-4(CAN)', 'ISO9141-2(iso)', 'ISO14229(uds)', 'SAEJ1850(VPW&PWM)']
          }
        },
        {
          key: 'Product8',
          pname: { 'name': `THINKTOOL`, 'url': '8.png' },
          pform: `hand-held device`,
          pfeatures: `first modular design diagnostic tool;   full system diagnostics; 15 maintenance reset functions; TPMS detection;  remote diagnostics(technician side); 12 functional modules; vehicle owner community; powerful diagnostic tool supports more than 160 vehicle brands`,
          ppositioning: `modular integrated maintenance diagnostic tool`,
          pusage: `maintenance diagnosis for full scenario use`,
          pcustomers: `comprehensive repair shop maintenance technician`,
          psystem: `manufacturer level detection and diagnosis for full system `,
          pprotocol: {
            title: 'compatible with all vehicles after 1996 support OBD II protocol:',
            listData: ['ISO 14230-4(KWP2000)', 'ISO 15765-4(CAN)', 'ISO9141-2(iso)', 'ISO14229(uds)', 'SAEJ1850(VPW&PWM)']
          }
        },
      ],
    }

  }
  componentDidMount () {

  }


  render () {
    let { dbdata, columns } = this.state;
    let _isMob = browserRedirect();
    return <Row className="tcPDBPage" style={_isMob ? { padding: '0px 10% 30px 10%', backgroundColor: '#fff' } : { padding: '0 0 30px 0', backgroundColor: '#fff' }}>
      <Row className="tcPDBTitle"><FormattedMessage id="tcPDBTitle" /></Row>
      <Row className={_isMob ? "" : "tc_dbt_t"}>
        <Row className="tc_db_r">
          {
            columns.map((_item, _idx) => {

              return <Col span={_item.clon}
                key={"tc_tt" + _idx}
                className={"tc_db_t tc_db_tt"}
                style={{ minWidth: _item.width }}
              >{_item.title}</Col>
            })
          }
        </Row>

        {
          dbdata.map((_item, _idx) => {
            return <Row className="tc_db_r tc_db_dr" key={"tc_ttd_" + _idx} >
              <Col span={4} className={"tc_db_t"} >
                <Row><img
                  alt={_item.pname.name}
                  className="think-car-home-price-img"
                  src={this.props.imgpath + '/Home/img/comparison/' + _item.pname.url}
                /></Row>
                <Row>{_item.pname.name}</Row>
              </Col>
              <Col span={2} className={"tc_db_t"} >{_item.pform}</Col>
              <Col span={4} className={"tc_db_t"} >{_item.pfeatures}</Col>
              <Col span={2} className={"tc_db_t"} >{_item.ppositioning}</Col>
              <Col span={3} className={"tc_db_t"} >{_item.pusage}</Col>
              <Col span={3} className={"tc_db_t"} >{_item.pcustomers}</Col>
              <Col span={2} className={"tc_db_t"} >{_item.psystem}</Col>
              <Col span={4} className={"tc_db_t"} >
                <Row>{_item.pprotocol.title}</Row>
                {
                  _item.pprotocol.listData.map((_d, _ix) => {
                    return <Row key={_item.pprotocol.title + 'and' + _d}>{_d}</Row>
                  })
                }
              </Col>
            </Row>
          })
        }
      </Row>

    </Row>
  }
}

