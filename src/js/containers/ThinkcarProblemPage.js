import React from 'react'
import { Row, Collapse } from 'antd';
import { FormattedMessage } from 'react-intl';

const { Panel } = Collapse;

export default class ThinkcarProblemPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {

    }

  }
  componentDidMount () {

  }


  render () {

    return <Row>
      <Row><h1>THINKCAR Q&A</h1></Row>
      <Row>Here are some answers to the questions you might have when you use THINKCAR. If your question is not answered here, please use the feedback feature to send an email to the THINKCAR Support Team. Thank you.</Row>

      <Collapse accordion>
        <Panel header={<FormattedMessage id="tcFaqQ1Title" />} key="1">
          <h4>Q: Where can I purchase a THINKCAR device?</h4>
          <p>A: THINKCAR products are sold online on our official website. www.mythinkcar.com, and (Amazon coming soon.) You may also find THINKCAR products in some brick and mortar stores.</p>
          <h4>Q: What’s the different between the THINKCAR 1 and THINKCAR 1S?</h4>
          <p>A: They differ in two major ways: price and functionality. With the THINKCAR 1S Full Vehicle Modules Scan and Real Time Remote Diagnostics are free for one year, for one vehicle. THINKCAR 1 is only free for 60 days Trial. After that you will need to purchase another subscription. Also, the THINKCAR 1S supports the Black Box feature and the THINKCAR1 does not.</p>
          <h4>Q: Could I purchase THINKCAR Products outside of North America?</h4>
          <p>A: We do not suggest purchasing outside of North America. Based on the coverage of car models, we support passenger vehicles sold in North America. We are working on developing other regions.</p>
          <h4>Q: I would like to know about the shipping details.</h4>
          <p>A: Orders from official webstores take 24-48 hours to be processed and shipped. (except holidays). Ordered placed on the official THINKCAR website (www.mythinkcar.com) support express shipping ($10 extra) and Standard shipping via USPS.</p>
          <h4>Q: How long is your warranty period?</h4>
          <p>A: The device is covered for one year from the date of purchase.</p>
          <h4>Q: What’s the refund policy?</h4>
          <p>A: If purchased from the official THINKCAR website you have 30 days to request a refund. Contact number: 833-692-2766. If purchased from another website, please return it using the same website.</p>

        </Panel>
        <Panel header={<FormattedMessage id="tcFaqQ2Title" />} key="2">
          <p>THINKCAR is a portable sensor product, developed based on OBD II function. It supports full OBD function, full system detection, one-button code clearing and diagnosis report, real-time remote diagnosis, OBD II data recording and playback, as well as providing all kinds of maintenance information. With a community of auto enthusiast friends and technicians.</p>
          <p><span className="tc-faq-right-think1-span">Full OBDⅡ Functions:</span> Support I/M Readiness, Live Data Stream, Freeze Frame, Read Fault Code, Clear Code, Monitor Test, and more!</p>
          <p><span className="tc-faq-right-think1-span">Full Vehicle Modules San Health Report:</span> Enhanced test for full electronic control system (ABS, SRS, etc.). Full system scan works with 23 major car brands(Check the compatibility list for more information on models supported: Think Car Compatibility List). The whole vehicle diagnosis will issue a THINKCAR based report in the system. The report contains the working status of the whole vehicle all systems. If there is something irregular, the report will have a detailed fault description. The user can be more clearly understand the issue and get quicker maintenance saving time and money.</p>
          <p><span className="tc-faq-right-think1-span">Real Time Remote Diagnostics:</span> This THINKCAR exclusive feature allows technicians to diagnose vehicles and identify suspicious problems remotely.</p>
          <p><span className="tc-faq-right-think1-span">Black Box:</span>This powerful diagnostic complement can be used in cases where you cannot duplicate the issue, Black Box can allow technicians to look at the history of your vehicle.</p>
          <p><span className="tc-faq-right-think1-span">THINKCAR User Community: </span>The ability to help and interact with other THINKCAR users. THINKCAR users can share their experiences, diagnosis, test reports, send messages to each other and get advice or tips.</p>
        </Panel>
        <Panel header={<FormattedMessage id="tcFaqQ3Title" />} key="3">
          <p>1) Make sure your vehicle is compatible. Vehicles which support OBD II standards after 2005. (Check the compatibility list for more information on models supported: Think Car Compatibility List).</p>
          <p>2) Install the THINKCAR APP on your smartphone and sign up for a new account. You can also sign in via Facebook or Twitter.</p>
          <p>3) Make sure your smartphone is connected to a stable network.</p>
          <p>4) Find the OBD II port of the vehicle. In most of the vehicles, it is located on the driver’s side under the dashboard and above the pedal.</p>
          <p>5) Insert the device into the OBD II port. Once connected, the device’s red light will turn on.</p>
          <p>6) Start your vehicle.</p>
          <p>7) Turn on Bluetooth on your Phone, or click on "Please pair THINKCAR with your car" in the APP.</p>
          <p>Please note: There is no need to pair the THINKCAR in Bluetooth setting. Pairing occurs automatically when Bluetooth is turned on.</p>
          <p>8) Once the device is paired, the red light will change to blue, and the APP will also show that the pairing is successful.</p>
          <p>9) While using real-time dashboard display, OBD diagnosis, full system detection, remote diagnosis, or black box functions, the blue light will flash, letting you know there is communication between the device and APP.</p>
          <p>10) The first time you use "Full OBD II Functions", "Full Vehicle Modules Scan Health Report" or "Real Time Remote Diagnostics", the APP will automatically download the diagnosis and detection software suitable for your vehicle. Software size is generally around 50M. Please make sure your smartphone is connected to a stable network.</p>
          <p>11) Please note the engine must be turning on, to use THINKCAR device.</p>
        </Panel>
        <Panel header={<FormattedMessage id="tcFaqQ4Title" />} key="4">
          <h3>Vehicle-supporting Questions</h3>
          <h4>Q: Unable to use THINKCAR diagnostic function</h4>
          <p>A: Please make sure that Bluetooth is connected, if it is not, use this link to check the guide for pairing the phone in the APP: https://mythinkcar.com/home/AppPush/thinkcar</p>
          <p>If you are sure that your phone is paired with the devices, and the APP still doesn’t work, please Update the Bluetooth firmware. Click here for a tutorial for the firmware update：</p>
          <p>https://mythinkcar.com/home/AppPush/software</p>
          <p>If you still cannot use the APP functions after the update, please click here to check the coverage of the model: https://mythinkcar.com/home/index/support/sid/2</p>
          <p>If the APP still doesn’t work properly, please contact our support team at the number provided: 833-692-2766</p>

          <h4>Q: I want to know whether my vehicle is supported.</h4>
          <p>A: Most vehicles from the 23 major brands from 2005 and up are supported. Please click here to check the Model Coverage.（https://mythinkcar.com/home/index/support/sid/2）</p>

          <h4>Q: THINKCAR could not read my VIN?</h4>
          <p>A: If the THINKCAR device does not find your VIN this means we do not support the vehicle currently. Please try THINKCAR on another vehicle.</p>
          <h4>Q: Are pickup trucks compatible?</h4>
          <p>A: Yes, THINKCAR can be used on pickup trucks sold in North America after 2005.</p>
          <h3>FAQ about the pairing/connecting</h3>
          <h4>Q: Does THINKCAR need an Internet connection?</h4>
          <p>A: The THINKCAR device doesn’t connect to the Internet. The THINKCAR app will connect to the device via Bluetooth. The THINKCAR app will need internet connection when using the diagnostic functions.</p>
          <h4>Q: How does THINKCAR connect to my Phone?</h4>
          <p>A: The THINKCAR APP will only connect via Bluetooth. Please pair the phone with the device via Bluetooth USING the THINKCAR App. Please click here for help on connecting the THINKCAR APP：https://mythinkcar.com/home/AppPush/thinkcar</p>
          <p>If the device is not connecting correctly, please make sure you turn on location permission. Without location permission, the scans won't return any results. Any smartphone with Android 6.0 or above will ask for location permission to scan for Bluetooth devices with low energy according to Google Policy on Android. We, the THINKCAR team declare here that we are NOT using your data for any purpose other than scanning for Bluetooth devices.</p>
          <h4>Q:Do I need to update the Bluetooth firmware?</h4>
          <p>A: When there is a new version, the Bluetooth firmware will need to be updated manually. You can do this by Opening the APP, then select "Bluetooth firmware fix" on the "My page" page, and follow the prompts to update.</p>
          <h4>FAQ about the OBD function</h4>
          <h4>Q: How do I use OBD?</h4>
          <p>A: Here is a tutorial for using OBD:</p>
          <p>Click here: https://mythinkcar.com/home/AppPush/obd</p>
          <h4>Q: How do I perform I/M Readiness operations?</h4>
          <p>A: Use the OBD function for this feature.</p>
          <h4>Q: How do I perform Mode 6 operation?</h4>
          <p>A: Use the OBD function for this feature.</p>
          <h4>Q: How do I perform smoke detection?</h4>
          <p>A: Use the OBD function for this feature.</p>
          <h3>FAQ about Full Vehicle Modules Scan</h3>
          <h4>Q:How do I use the Full Vehicle modules scan?</h4>
          <p>A: Please click here to view the tutorial：https://mythinkcar.com/home/AppPush/full</p>
          <h4>Q: Does it read the electronic control equipment data of the vehicle? (Example, ABS, SRS, steering system, brake system data?)</h4>
          <p>A: Yes! This is included in the Full Vehicle Modules Scan.</p>
          <h3>FAQ about Real Time Remote Diagnostics</h3>
          <h4>Q: How do I use Real Time Remote Diagnostics?</h4>
          <p>A: Please click here to check the tutorial for starter:https://mythinkcar.com/home/AppPush/remote</p>
          <h4>Q: How do I get help from a Mechanic in remote diagnosis?</h4>
          <p>A: After generating the 6-digit diagnostic code in the APP, you will need to contact your professional mechanic who knows car repair technology. Once your mechanic has the 6-digit code they can log into www.mythinkcar.com and view the cars performance in real-time. Currently THINKCAR is unable to find a mechanic for you.</p>
          <h4>Q: What device do I need to open on the remote diagnostic interface?</h4>
          <p>A: Any device with access to a web browser will work. (EX: smartphone, Tablet, PC or Laptop)</p>
          <h4>Q: Can you provide more details on the Real Time Remote Diagnostics feature?</h4>
          <p>A: Real Time Remote Diagnostics provides professional-level diagnostic, special functions and motion tests, etc. The report is particularly useful for mechanics or owners with higher maintenance levels. In Real Time Remote Diagnostics also include special functions and motion tests, such as "Learn Functions, Reset Functions".</p>
          <h4>Q: What’s the difference between Real Time Remote Diagnostics and Full Vehicle Modules Scan?</h4>
          <p>A: Real Time Remote Diagnostics is mainly for mechanics or owners with higher maintenance levels, with access to special functions and motion tests, and more. While, Full Vehicle Modules Scan is a scan of all the electronic modules in the vehicle, this will generate a report that will list all fault codes, which can be cleared by one button.</p>
          <h3>Questions about Black Box Function</h3>
          <h4>Q: How do I use the Black Box Function?</h4>
          <p>A: Please click here for a guide on using the Black Box:https://mythinkcar.com/home/AppPush/blackbox

The main function of the black box is to record live data while driving. The data can be recorded in every 5 or 10 seconds and is stored in the THINKCAR device storage. When the black box is active, all the OBD data of the vehicle will be saved. The data can then be synchronized to the phone via Bluetooth, and you can view the vehicle's driving information in dynamic form. This data could be sent to a car mechanic, who can help locate problems or hidden dangers more quickly. The amount of recorded data varies depend on the model of the vehicle, the recorded time will be at least 36 hours, and up to 60 hours. The data is then presented in the form of a chart.</p>
          <h3>Questions about the Diagnosis Report</h3>
          <h4>Q: How do I check my report?</h4>
          <p>A: You can view Reports on the "Diagnostic" or "My" interface.</p>
          <h4>Q: Can I share my test report to others?</h4>
          <p>A: Yes, you can share it with your friends via Facebook, Twitter, or within the THINKCAR App community.</p>
          <h4>Q: Can the report be saved in PDF format?</h4>
          <p>A: Yes! PDF is supported.</p>
          <h3>Questions about downloading the software and Update</h3>
          <h4>Q: Does the THINKCAR device require a firmware Update?</h4>
          <p>A: When you connect the THINKCAR device and the APP it will scan to see if it is on the latest version. If it is not, it will prompt the user to Update.</p>
          <p>P.S. The Bluetooth Update firmware Update requires manual operation: enter "My" and select "Bluetooth Firmware". Once the latest Bluetooth firmware is found, you will see a prompt to update and confirm the installation. After the installation is complete, you will need to detach and reattach the device to reconnect Bluetooth.</p>
          <h4>Q: Why do I need to download additional diagnostic software after I installed the app?</h4>
          <p>A: There is a difference between App software and diagnostic software. Due to the large number of vehicle models on the market, the diagnostic software is only downloaded for the car connected to the device.</p>
          <h4>Q: Why do you need to download software for every function?</h4>
          <p>A: THINKCAR's OBD diagnostics, Full Vehicle Modules Scan, and Real Time Remote Diagnostics are three separate functions. Each requires a download of the correct software for your specific make and model.</p>
          <h3>FAQ about the subscribe fee</h3>
          <h4>Q: Is there any additional cost for using the THINKCAR service?</h4>
          <p>A: If you already have a THINKCAR device, you can use the OBD diagnostics without restrictions, and you can use it on multiple cars without paying.</p>
          <p>The Real Time Remote Diagnostics and Full Vehicle Modules Scan require an additional purchase. If you purchased the THINKCAR 1S these functions are free for one year for one VIN, and THINKCAR 1 comes with a 60-day free trial for one VIN. Both the trial and one year start on first use of service, not purchase date. For each additional car or to renew your current offer the price is $9.95 per year.</p>
          <p>Black box function, THINKCAR 1S offers this feature with no additional cost. THINKCAR 1 requires a one-time activation fee of $25 to use black box functions.</p>
          <h4>Q: Is the cost of purchasing a VIN the same on IOS and Android?</h4>
          <p>A: Yes!</p>
          <h3>Questions about points and invitation code</h3>
          <h4>Q: What are the points in the THINKCAR App for and how do I use them?</h4>
          <p>A: Points are earned by accomplishing tasks related to THINKCAR. Such as referring others to use our products, Official THINKCAR activities, and more ways coming soon. Each point can be redeemed for one dollar off THINKCAR products and services.</p>
          <p>Note the price can only be ducted by full dollar amounts. If a service is listed at $9.99 you can use up to 9 points and bring the total to $.99.</p>
          <h4>Q: What is the invitation code in the THINKCAR App for and how do I use it?</h4>
          <p>A: Once you create an account on the THINKCAR app you can send out an invitation code. Each person that uses your code will receive $10 off the purchase of a THINKCAR product on the office website. Each time your code is use you will receive 2 points in your account.</p>

        </Panel>
        <Panel header={<FormattedMessage id="tcFaqQ5Title" />} key="5">
          <h4>Q: What size is the THINKCAR 1 and 1S? (inch)</h4>
          <p>A: Size: 1.59 inches x 1.79 inches x .88 inches.(39mm x 45.5mm x 22.4mm)</p>
          <h4>Q: Does my THINKCAR device need to be charged? How about the power consumption, is it safe?</h4>
          <p>A: The THINKCAR is powered directly from the vehicles OBD II port. The main power consumption of the device is using Bluetooth Low Energy on supported devices.</p>
          <h4>Q: What is the voltage supported by the THINKCAR device?</h4>
          <p>A: The device support 8-18V voltage, according to the J1962 standard.</p>
          <h4>Q: Can my THINKCAR device stay plugged in?</h4>
          <p>A: Yes, you can use THINKCAR as a vehicle companion.</p>
          <h4>Q: Can my THINKCAR device be used on more than one car?</h4>
          <p>A: Yes, the device can be plugged into different vehicles for "Full OBD II Functions" and Black Box function. The "Full Vehicle Modules Scan" and "Real Time Remote Diagnostics" need to identify and bind the VIN number of the vehicle, which can only be used for one vehicle each VIN.</p>
          <p>"Full Vehicle Modules Scan" and "Real Time Remote Diagnostics" cost an additional $9.95 per year per vehicle. One device can bind up to 9 VIN numbers. Black Box function can be used in different vehicles after being activated. It will not bind to the VIN number.</p>
          <h4>Q: Can my THINKCAR device connect to multiple mobile phones?</h4>
          <p>A: Yes, just use the same log-in information on the other mobile device. After changing the phone and logging in, the software matching the car model needs to be downloaded to the new phone.</p>
          <p>Please note that different APP accounts can be used as long as they are connected to the same device and check the vehicle VIN number. The use of “full system detection” and “remote diagnosis” functions is linked to the device number and VIN number, not the APP account.</p>
          <h4>Q: Can the THINKCAR device connect to a laptop or PC?</h4>
          <p>A: No, it cannot. The THINKCAR device is only supported by the official Android and IOS app.</p>
          <h4>Q: Will THINKCAR interfere with other devices in my car?</h4>
          <p>A: No, our Bluetooth module has been thoroughly tested to ensure that it does not interfere with other Bluetooth devices.</p>
          <h4>Q: Does my THINKCAR device use my car's Bluetooth?</h4>
          <p>A: No, it does not.</p>
        </Panel>
        <Panel header={<FormattedMessage id="tcFaqQ6Title" />} key="6">
          <h4>Q: Where can I download the THINKCAR APP?</h4>
          <p>A: You can search for "THINKCAR" in Google Play, App Store or log in to <a>www.mythinkcar.com</a>.</p>
          <h4>Q: Can I download THINKCAR APP with my phone?</h4>
          <p>A: The THINKCAR APP supports Android 5.0 and iOS 9.0 and above for smartphones.</p>
          <h4>Q: Can I download and install the THINKCAR APP on my tablet?</h4>
          <p>A: The THINKCAR APP supports Android 5.0 and iOS 9.0 and above for smartphones and tablets.</p>
          <p>The THINKCAR APP was developed mainly for mobile phones. If you encounter any issues with the installation process, please contact us at <span style={{ color: '#308bdf' }} >support@thinkcarus.com</span></p>
          <h4>Q: Do I have to register to use THINKCAR APP?</h4>
          <p>A: Yes, you can create a new account or use your Facebook or Twitter account to log in.</p>
          <h4>Q: I did not receive the sign in verification code.</h4>
          <p>A: Please check your spam folder. If it is not there try sending the code again.</p>
          <h4>Q: What do I do if I forgot my password?</h4>
          <p>A: Please use "forgot password" on the log-in page.</p>
          <h4>Q: Without a THINKCAR device, can I download and register for the THINKCAR APP?</h4>
          <p>A: Yes! You can interact with other users in the discovery community.</p>
          <h4>Q: When using a THINKCAR device, do I need to bind it to my APP account?</h4>
          <p>A: There is no binding required between the device and the APP. Simply connect your account via Bluetooth to any THINKCAR device within range. </p>
          <h4>Q: Do you support multiple languages?</h4>
          <p>A: Currently we only support English, more languages are coming soon.</p>
          <h4>Q: How can I update my app?</h4>
          <p>A: When there is a new version of the app, you will be able to update them the same way as your other apps. From the Google play or Apple app store. </p>
        </Panel>
        <Panel header={<FormattedMessage id="tcFaqQ7Title" />} key="7">
          <h4>Q: What is the fault code?</h4>
          <p>A: Vehicle fault code is the code reflected by the vehicle computer ECU analysis if there is anything wrong. THINKCAR can scan, clear and explain the system fault codes defined by both standard OBD II and manufactory code.</p>
          <h4>Q: What is OBD?</h4>
          <p>A: OBD stands for On-board diagnostics. It is a standardized system that allows external electronics to connect to the vehicle’s computer system. As cars become more computerized and more significant, software becomes the key to solving many problems and unlocking performance.</p>
          <p>OBD can detect the working status of the electronic engine control system and other functional modules of the vehicle during operation. By using the OBD port of the vehicle to connect with professional equipment, the vehicle data can be viewed in real time. Issues can be detected, the vehicle maintenance, the development of automobile related functions and the transformation of automobile equipment can be facilitated conveniently.</p>
          <h4>Q: Where is my OBDII port?</h4>
          <p>A: The OBDII ports are typically below the driver's side of the dashboard, and vary from car to car, either above the accelerator pedal or in front of the lever. Some models have caps on their OBDII ports, while the usual OBDII ports are black, white, or blue. If you can't find it, you can contact the seller, the service provider, or look up the car manual.</p>
        </Panel>
        <Panel header={<FormattedMessage id="tcFaqQ8Title" />} key="8">
          <h4>Q: How do I protect my privacy?</h4>
          <p>A: We have a strict privacy policy, which is protected by comprehensive technology.</p>
          <h4>Q: Will my vehicle data be known by others?</h4>
          <p>A: Your data and only be viewed by others if you share it with them.</p>
          <h4>Q: Why do you need to access my personal data?</h4>
          <p>A: Here is a list for reason for all the data request: </p>
          <p><span className="tc-faq-right-think1-span">Location information</span> - To scan the Bluetooth devices with low energy according to Google Policy on Android.</p>
          <p><span className="tc-faq-right-think1-span">Storage </span>- This is for file storage and storing temporary community cache files</p>
          <p><span className="tc-faq-right-think1-span">Telephone / keyboard</span> –This will only be used when you call customer services. allows the app to send the number to your phone app to complete the call.</p>
          <p><span className="tc-faq-right-think1-span">Camera Permission</span> – When you want to take pictures.</p>
          <p><span className="tc-faq-right-think1-span">Microphone</span> - Microphone is only used when you want to send voice messages to other users.</p>
          <p><span className="tc-faq-right-think1-span">Audio Recording Permission</span> – For chatting and sending community updates.</p>
          <p><span className="tc-faq-right-think1-span">Permission to detect WIFI status</span> - To confirm if you are using WIFI when downloading large files.</p>
          <p>We will never share or use your personal data without your consent.</p>
          <h4>Q: What are some benefits of THINKCAR compare with another product like Bluedriver?</h4>
          <p>A: THINKCAR 1S and BlueDriver both supported the same OBD II ten modes. For the full system scan, we cover 23 different Manufactures compared to BlueDriver's 5 Manufactures. Also, THINKCAR has added real time diagnostic, Black Box, and social community feature into our app while BlueDriver simply lacks these features.</p>

        </Panel>

      </Collapse>
    </Row>
  }
}

