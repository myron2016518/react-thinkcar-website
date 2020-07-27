import React from 'react'
import { Row, Collapse } from 'antd';
import { FormattedMessage } from 'react-intl';

const { Panel } = Collapse;

export default class ThinkDiagProblemPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {

    }

  }
  componentDidMount () {

  }


  render () {

    return <Row >
      <Collapse accordion expandIconPosition="right">
        <Panel header={'What can THINKDIAG do'} key="tc-diagpb-key1">
          <h4>Q: What is THINKDIAG and what can it do?</h4>
          <p>A: Thinkdiag is an OBD tool that uses Bluetooth to connect with a smartphone or tablet. It is an economical and portable diagnostic tool for car enthusiasts and mechanics.</p>
          <p>Thinkdiag is composed of the Thinkdiag Dongle and Thinkdiag App, which can install client soft-ware and diagnostic software, to carry out vehicle fault diagnostics. Thinkdiag connects to the vehicle’s OBD port and communicates wireless with the smart phone or tablet via Bluetooth.</p>
          <p>Thinkdiag can be compared to any professional and expensive diagnostic equipment. It can scan the full systems which including reading version information, reading fault code, clearing fault code, reading data flow, actuation test, ABS bleeding, etc.</p>

          <h4>Q: What are some special features of Thinkdiag?</h4>
          <p>A: Thinkdiag is not a simple basic OBD scan tool, it’s a professional diagnostic dongle. For the vehicle diagnosis, it can do almost OE level and bidirectional functions. For maintenance reset-ting, it includes but not limited to Maintenance Light Reset, DPF Regeneration, Brake Pad reset, Steering Angle Reset, Battery Matching, ABS reset, Throttle Matching, Tire Pressure reset, An-ti-Theft Matching and more!</p>

          <h4>Q: Who is Thinkdiag designed for?</h4>
          <p>A: Thinkdiag aims to provide affordable, high-performance products for mechanics, garage techni-cians, and individual owners who enjoy working with vehicles.</p>
          <p>Some scenarios are:</p>
          <p>1. If you do door-to-door service or road rescue, whether it be maintenance or repair, a porta-ble Thinkdiag is the best choice.</p>
          <p>2. For garages, instead of using an expensive diagnostic tool, Thinkdiag can be considered as it is so powerful and covering all diagnostic functions.</p>
          <p>3. For DIY users, when basic OBD equipment cannot meet your high demands, the powerful ‘Thinkdiag’ will be able to diagnose more and make maintenance easy. </p>
          <p>4. The Lightweight and compact design make the Thinkdiag the ideal tool for people who have certain maintenance skills and, to carry affordable Thinkdiag diagnostic equipment.</p>
        </Panel>
        <Panel header={'Setting up your THINKDIAG device for the First-time'} key="tc-diagpb-key2">
          <h4>1. Download ThinkDiag App:</h4>
          <p>Search “ThinkDiag” in App Store or Google Play. ThinkDiag App is FREE to download. (as shown in the figure below)</p>
          <h4>2. Sign In or Sign Up:</h4>
          <p>If you already have a Thinkcar Tech account, please sign in with your Thinkcar Tech account; If you do not have one, please sign up for an account. Please note that one Thinkcar Tech ac-count is common for all products from Thinkcar Tech company.</p>
          <p>How to Sign Up for an Account:</p>
          <p>Open the ThinkDiag App, click on “Sign Up”. Input your username, email, and verification code (which will be sent to the email you input), then create your own password. Click on “Sign Up” and finish.</p>
          <h4>3. Activate a ThinkDiag Device: </h4>
          <p>After the registration, there will be a notification of “Activation Code”. Click on “OK” to open the activation page, you need to input the serial number and a 8-digit activation code of your ThinkDiag device. </p>
          <h4>4. Download Diagnostics Software:</h4>
          <p>After the activation, go to “ThinkStore” to download diagnostics software. Each ThinkDiag de-vice comes with 1 FREE diagnostics software for one year. Please select the software based on your vehicles, and download the corresponding software.</p>
          <h4>5. Insert the ThinkDiag Device into OBDII port in Your Vehicle:</h4>
          <p>Usually, the OBDII port is located under the dashboard, above the pedal on the driver’s side. Here are the 5 common positions of OBDII port (as shown in the figure below). Insert the ThinkDiag device, there will be a green light which indicates the device is powered on.</p>
          <h4>6. Bluetooth Connection:</h4>
          <p>Open the ThinkDiag App, it will automatically search to activated device and connect via Bluetooth in the App.</p>
          <h4>7. Start to Use Your ThinkDiag Device: </h4>
          <p>After the bluetooth connection, you can use all the functions of your ThinkDiag device such as: All Systems Diagnostics, Maintenance&Service Functions, OBD II Diagnostics, Thinkcar Re-mote Diagnostics.</p>
        </Panel>
        <Panel header={'Questions about the THINKCAR Hardware'} key="tc-diagpb-key3">
          <h4>Q: What’s the different lights of ThinkDiag indicate?</h4>
          <p>A:  There are four different lights of ThinkDiag:</p>
          <p>    Continuous Green Light: ThinkDiag device is powered on.</p>
          <p>    Continuous Blue Light: Bluetooth is connected. </p>
          <p>    Flashing Blue Light: Bluetooth is in communication. </p>
          <p>    Continuous Red Light: Firmware upgrade successful or firmware upgrade failed.</p>
          <h4>Q: Does my Thinkdiag device need to be charged? How about the power consumption, is it safe?</h4>
          <p>A: Thinkdiag is powered directly from the vehicles OBD port. The power consumption of the device is very low and it’s safe.</p>
          <h4>Q: Does  Thinkdiag work with diesel trucks?</h4>
          <p>A: Yes. Only for light duty.</p>
          <h4>Q: Will Thinkdiag interfere with other devices in my car?</h4>
          <p>A: No, our Bluetooth module has been thoroughly tested to ensure that it does not interfere with other Bluetooth devices.</p>
          <h4>Q: Does my Thinkdiag device use my car's Bluetooth?</h4>
          <p>A: No, it does not.</p>
        </Panel>
        <Panel header={'Questions about the THINKCAR Software'} key="tc-diagpb-key4">
          <h4>Q: Why do I need to download the diagnostics software after download the App?</h4>
          <p>A: Due to a variety of vehicle manufacturers on the market, different vehicle manufacturers re-quire corresponding diagnostics software. Therefore, ThinkDiag will recognize the vehicle manufacturer first while diagnosing, then download the corresponding diagnostics software to work. </p>
          <h4>Q: What is Thinkdiag's vehicle diagnostic software policy and the ThinkStore?</h4>
          <p>A: The first time you use this tool, it will ask you to select the vehicle diagnostic software you want to download. Each manufacturer software is $39.95 per year. </p>
          <p>ThinkStore has all the all the vehicle diagnostic softwares that Thinkdiag can use, covering more than 95% of car models in the market.</p>
          <p>The diagnostic software is valid for one year and require renewal after expiration.</p>
          {/* <p>After you download the two free vehicle diagnostic softwares, you need to purchase if you want to download more softwares. </p> */}
          <p>The procedure for purchasing additional diagnostic software is as followed:</p>
          <p>Activate device → Open ThinkStore in the Thinkdiag App → Select the software → Select buy now/add to shopping cart → Complete payment → Download diagnostic software → Start the diagnosis.</p>
          <h4>Q: Which vehicle can ThinkDiag diagnose?</h4>
          <p>A: ThinkDiag supports 37 vehicle manufactures, diagnoses more than 110 vehicle brands. The diagnostics software are available in ThinkStore in the ThinkDiag App. </p>
          <p>Note: The sizes of different manufactures’ diagnostics software are different. Some software are large which requires a good network environment to download.</p>
          <h4>Q: What are the special functions of ThinkDiag?</h4>
          <p>A: ThinkDiag supports 16 special functions, including: AFS RESET、Elec.Throttle RLRN、GEAR LEARN、Immobilizer/Keys、INJECTOR、RESET BRAKE、RESET OIL、RESET SAS、RESETBLEED、RESETBMS、RESETBOX、RESETDPF、RESETEGR、RESETTPMS、SUNROOR、RESET SUS. According to different vehicle manufacturers’ di-agnostics software, there will be more special functions.</p>
          <h4>Q: Does Thinkdiag support multiple languages?</h4>
          <p>A: Thinkdiag App supports the following languages: English, Japanese, French, Spanish, Portu-guese,Italian, German. Thinkdiag diagnostic software supports the following languages: English, Chinese, Japanese, Korean, French, Spanish, Portuguese, Italian, Russian, German, Polish, Romanian, Dutch, Arabic, Czech, Danish, Greek, Persian, Finnish, Hungarian, Swedish, Turk-ish, Serbian, and Croatian.</p>
          <h4>Q: What smartphones can download ThinkDiag App?</h4>
          <p>A: ThinkDiag App supports smartphones with Android 5.0 and above, IOS 9.0 and above. It cannot be used on PC with WINDOWS system.</p>
          <h4>Q: Does ThinkDiag need firmware upgrade?</h4>
          <p>A: Yes, it does. When the ThinkDiag device is connected to the bluetooth on your smartphone, it will automatically check if the firmware of your device is the lasting version. If it’s not, it will upgrade automatically.</p>
          <h4>Q: Can the same App account bind with multiple devices?</h4>
          <p>A: Yes, you can set it in the App.</p>
        </Panel>
        <Panel header={'Some other notes during use'} key="tc-diagpb-key5">
          <h4>Q: How long is your warranty period?</h4>
          <p>A: One year.</p>
          <h4>Q: What is the refund policy?</h4>
          <p>A: Depends on the refund policy of the purchase platform.</p>
          <h4>Q: Does Thinkdiag require an internet connection?</h4>
          <p>A: Thinkdiag device required Bluetooth connection with your smartphone. If you need to update your vehicle diagnostic software, your smartphone needs an internet connection. </p>
          <h4>Q: How do I check my report?</h4>
          <p>A: You can check your report history on the "Diagnostic" or "My" page.</p>
          <h4>Q: Can I share my test reports to others?</h4>
          <p>A: Yes, you can share it with your friends via Facebook, Twitter, or within the Thinkdiag App community (ThinkMoments).</p>
          <h4>Q: Can the reports be saved in PDF format?</h4>
          <p>A: Yes. </p>
          <h4>Q: Can my Thinkdiag device be used on more than one car?</h4>
          <p>A: Yes, the device can be used with different vehicles as long as you download the correspond-ing diagnostic software.</p>
          <h4>Q: Can my Thinkdiag device connect to multiple smartphones?</h4>
          <p>A: Yes, simply use the same login information. After logging in with a new smartphone, the software matching the car model will need to be downloaded to the new phone.</p>
          <h4>Q: Can Thinkdiag device connect to a laptop or PC?</h4>
          <p>A: No. Thinkdiag device is only supported by the official Android and IOS App.</p>
          <h4>Q: What do I do if I forget my password?</h4>
          <p>A: Please use "forgot password" on the login page.</p>
          <h4>Q: Without a Thinkdiag device, can I download and register for the Thinkdiag App?</h4>
          <p>A: Yes. You can interact with other users in the ThinkMoments.</p>
          <h4>Q: Will my vehicle data be known by others?</h4>
          <p>A: Thinkdiag respects your privacy and all your personal information will be kept confidential and encrypted, your data can only be viewed by others if you share it with them.</p>
        </Panel>
        <Panel header={'App account, Points and Invitation code'} key="tc-diagpb-key6">
          <h4>Q: What is the point in ThinkDiag account? How to use the points?</h4>
          <p>A: Every user has the chance to get the points. For example, recommend others to purchase our products, participate in Thinkcar Tech’s official activities, etc. One point redeems one dollar, which can be used to purchase products and services. There will be more points usages.</p>
          <h4>Q:What is the invitation code in ThinkDiag App? How to use it?</h4>
          <p>A: After signing up for your account in the App, you will get your own invitation code. The code can be shared with your friends and they will get discount. Every time the invitation code be used, you will get points as a reward. </p>
        </Panel>
      </Collapse>
    </Row>
  }
}

