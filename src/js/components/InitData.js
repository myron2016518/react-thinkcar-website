const initData = {
  _isPcOrMobile: true,  // true : PC  ， false : Mobile
  isLogin: false,
  userInfo: { id: '001', name: 'liuyu', token: '002' },
  md5Code: '99a2eb85f315d136f064cb7d4bcdc884',
  _homeImgPath: 'https://www.mythinkcar.com',
  _homeApiImgPath: 'https://api.mythinkcar.com/',
  _momentsPath: 'https://www.mythinkcar.com/home/explore/tmpv2',
  _indexBinnerImgList: [],
  _indexImgAll: {
    "img1": "/Home/img/point.jpg",
    "img2": "/Home/img/index_img2.jpg",
    "img3": "/Home/img/index_img3.jpg",
    "img4": "/Home/img/index_img4.jpg",
    "img5": "/Home/img/index_img5.jpg",
  },
  _indexMobileImgAll: {
    "img1": "/Home/img/mobile/point.jpg",
    "img2": "/Home/img/mobile/index_img2.jpg",
    "img3": "/Home/img/mobile/index_img3.jpg",
    "img4": "/Home/img/mobile/index_img4.jpg",
    "img5": "/Home/img/mobile/index_img5.jpg",
  },
  _aboutPageImg: '/Home/img/about_banner.jpg',
  _pointDetailPageImg: '/Home/img/point_detial.jpg',
  _newsPageImg: '/Home/img/news_banner.jpg',
  _newsPageList: [
    { "id": "news1", "title": "This Changes Everythingt", "author": "Scotty", "url": "https://www.youtube.com/embed/lFF9eQwb9Jk" },
    { "id": "news2", "title": "Another OBD11 device on the market (THINKCAR review)", "author": "Ryan Powell", "url": "https://www.youtube.com/embed/wIg-ERKQEzU" },
    { "id": "news3", "title": "THINKCAR 1S Professional OBD2 Scan Tool First Look", "author": "Awkward Hampster", "url": "https://www.youtube.com/embed/6GaLuJMi7KA" },
    { "id": "news4", "title": "THINKCAR 1s Review and How to Use - Remote Diagnosis OBDII Scanner Bluetooth", "author": "Lawren Wetzel", "url": "https://www.youtube.com/embed/tdP_x62fbTo" },
    // { "id": "news1", "title": "", "author": "", "url": "" },

  ],
  _newsPageTxtList: [
    {
      "id": "newsTxt1", "title": "HERE’S ALL YOU NEED TO KNOW ABOUT OBD/OBD II", "dataTime": "31, MAR 2019",
      "url": "/Home/img/news/2.png",
      "dec": "Regardless of your vehicle repair skill level, using an OBD-II code scanner is simple and straightforward. Before you get started, make sure to read the scan tool’s user manual and documentation. Whether it’s handheld, wireless or built into your vehicle, an OBD-II scanner is a great way to diagnose many vehicle repairs inexpensively and easily.",
      "detailList": [
        { "id": "newsTxt1_1", "type": "img", "url": "/Home/img/news/2_1.jpg", "title": "", "content": "" },
        { "id": "newsTxt1_2", "type": "txt", "url": "", "title": "", "content": "You never know what secrets are hidden under your dashboard. If you own a car built in the last 20 years, that’s where you’ll find the entry point to virtually everything that makes it tick. We’re talking about the OBD II port, which, if you have the right device, lets you diagnose mechanical problems, boost performance, and more. But what exactly is OBD II, and why is it so important to modern cars? We’ve got all of the answers right here." },
        { "id": "newsTxt1_3", "type": "txt", "url": "", "title": "What is OBD?", "content": "OBD stands for On-Board Diagnostic. It’s the standardized system that allows external electronics to interface with a car’s computer system. It has become more important as cars have become increasingly computerized, and software has become the key to fixing many problems and unlocking performance.OBD has existed in various forms long before anyone ever uttered the words “infotainment” or “connected car.” It came about primarily because of two factors: the need to regulate emissions, and the mass adoption of electronic fuel injection by automakers beginning in the 1980s.Unlike carburetors or previous mechanical fuel-injection systems, electronic fuel injection (EFI) requires computer control. Like its predecessors, EFI regulates fuel flow into the engine, but it does so using electronic signals rather than mechanical bits. That created the first major need to put computers in cars." },
        { "id": "newsTxt1_4", "type": "txt", "url": "", "title": "OBD vs. OBD II", "content": "Several automakers introduced computer interfaces for their own cars before the 1990s, but the push to standardize didn’t begin until 1991, when the California Air Resources Board (CARB) mandated that all cars sold in California needed some form of OBD capability. However, CARB didn’t issue standards for the systems until 1994. Known as OBD II, that standard was implemented for the 1996 model year, and is still in use today. Previous iterations of OBD were retroactively classified OBD I.Virtually every new car sold in the U.S. over the past 20 years follows the OBD II standard. OBD II cars have a port — usually located under the dashboard on the driver’s side — that devices can plug into and connect to a car’s computer. Companies have plenty of ideas about what you can plug into that port." },
        { "id": "newsTxt1_5", "type": "txt", "url": "", "title": "Delving into diagnostics", "content": "As the name implies, diagnostics are the primary purpose of OBD. When a car’s sensors decide that something is amiss, they trigger a message known as a “trouble code,” which may manifest as a “check engine” light or other warning on the dashboard. OBD scanners can check these trouble codes to determine exactly what’s wrong, and clear them from the computer’s memory once the problem is fixed.The trouble codes are just that, though: codes. Instead of a diagnosis like “loose gas cap,” you will see a string of letters and numbers that is incomprehensible without a reference. Trouble codes start with a letter and include four or five numbers, which together point to the specific subsystem and what problem it is experiencing.Some OBD scanners come preloaded with definitions for these codes, but otherwise you’ll need a list like the one that can be found on OBD-Codes.com. Note that in addition to the generic codes that apply to all cars, individual manufacturers have their own specific codes. Finding these can be a bit trickier, as not every manufacturer is entirely comfortable with the idea of releasing them to the public." },
        { "id": "newsTxt1_6", "type": "txt", "url": "", "title": "OBD for performance", "content": "Diagnostics may be the most important function of OBD equipment, but these tools can also be used to make your car go faster.Several aftermarket brands offer both OBD II data loggers and performance tuners that access critical vehicle systems through the dashboard port. Data loggers can be used to track more mundane things like fuel economy, but they can also record things like lap times and power output. Professional racers rely on this data to see how they perform on a track and to tweak their cars, so why shouldn’t you?Some companies also offer performance upgrades for specific vehicles that remap or alter software to unlock horsepower. Since modern vehicles are so dependent on computer controls, software changes can be as effective as bolting on a new air intake or exhaust system. It’s worth noting that these upgrades may have negative effects in other areas — such as reliability or fuel economy — and may void the factory warranty. Check before installing." },
        { "id": "newsTxt1_7", "type": "txt", "url": "", "title": "OBD Dongles", "content": "" },
        { "id": "newsTxt1_8", "type": "img", "url": "/Home/img/news/2.png", "title": "OBD Dongles", "content": "" },
        { "id": "newsTxt1_9", "type": "txt", "url": "", "title": "", "content": "Not everyone has the wherewithal to try to fix their own vehicle or upgrade their performance. Recently, companies have tried to exploit OBD II for more mainstream applications in the form of “dongles” — devices that plug directly into the OBD II port and connect wirelessly to a network.Dongles are sometimes issued to customers by insurance companies as a way to achieve discounts. This generally involves using data pulled from the car’s OBD II connection to analyze driving habits and award a discount for low-risk behavior. Allstate’s Drivewise program, for example, looks at speed, how quickly the driver brakes, the number of miles driven, and when a person drives.Other devices — such as Verizon’s Hum — enable telematics features, similar to what some automakers offer through subscription services. When paired with a smartphone app, Hum provides vehicle diagnostics, roadside assistance, stolen vehicle tracking, geofencing, and speed-alert features for parents looking to keep teen drivers on a short leash.When considering one of these devices, it’s important to remember that the physical separation between your car’s computer and a network that might contain malware is the first line of defense against hacking. Plugging anything into your car’s OBD II port compromises that barrier by giving an external device access to your car’s systems.In the case of telematics devices that send data across a wireless network, the network connection itself can be a second point of vulnerability. Just like any other connected device, there is no guarantee of invulnerability to security breaches." },
        // { "id": "newsTxt1_3", "type": "txt", "url": "", "title": "", "content": "" },
      ],
    },

    {
      "id": "newsTxt2", "title": "OBD AND SCAN TOOLS", "dataTime": "31, MAR 2019",
      "url": "/Home/img/news/3.jpg",
      "dec": "With accurate data, a code tells you what the underlying problem is, what might be causing it or what parts are needed to fix the problem. It is a starting place and gives you some direction as to what might be wrong with the vehicle so our customers can decide what he or she wants to do next.",
      "detailList": [
        { "id": "newsTxt2_1", "type": "txt", "url": "", "title": "", "content": "When the “Check Engine” light comes on, many motorists don’t have a clue as to what to do next. They know the light means something is wrong, but is it a serious problem or a minor one? The only way to know for sure is to plug a scan tool or code reader into the vehicle’s diagnostic connector and see what comes out.One of the first auto parts stores to offer a free plug-in diagnostic service for motorists who wanted to find out what was causing their “Check Engine” light to come on was AutoZone. The program is popular with motorists because it saves the cost of having to take the vehicle to a new car dealer or repair facility to have it diagnosed. Being able to tell customers why their “Check Engine” light is on opens the door for potential parts sales, and it helps the motorist to decide whether or not the problem is something they want to tackle themselves. At the very least, knowing why the “Check Engine” light is on allows the customer to be better informed should they decide to take their vehicle to a professional for repairs.An Onboard Diagnostic II (OBD II) plug-in diagnosis is relatively simple to perform and requires only a code reader or basic scan tool. The tool is plugged into the diagnostic connector (which is usually located under the instrument panel near the steering column). To read the code(s) that are causing the “Check Engine” light to come on, you simply turn on the ignition, follow the prompts on the code reader or scan tool screen and read out the code(s).The least expensive code readers only display a number, so you have to look up the code definition in a handbook to find out what it means. The more expensive tools give you the number and a brief definition. The trouble is, a code doesn’t always tell you what the underlying problem is, what might be causing it or what parts are needed to fix the problem. But, it is a starting place and gives you some direction as to what might be wrong with the vehicle so your customer can decide what he or she wants to do next." },
        { "id": "newsTxt2_2", "type": "txt", "url": "", "title": "Scan Tool Differences", "content": "Whether you are choosing a scan tool for diagnosing customer’s vehicles, or are recommending a scan tool to a DIYer or a professional, there are major differences between the types of scan tool products available.There is a huge difference between a basic code reader and a full-fledged scan tool. A basic code reader that sells for less than $50 may be fine for reading “generic” diagnostic trouble codes, but it may not read “OEM” or “enhanced” codes that are vehicle specific.There are two types of OBD II diagnostic trouble codes: generic “P0” codes and enhanced “P1” codes. All vehicles use the same basic definitions for the generic codes, but the enhanced codes are vehicle-specific and may vary from one model year to the next. So it will likely be out of date by the next model year and have to be updated or replaced. What’s more, some types of faults will set a P1 code but not set a P0 code. That’s why you need a tool that can read both types of codes, not just the generic ones.The next step up in terms of capabilities are code readers that can also display the readiness status of the vehicle’s OBD II system monitors. These are self-checks that the OBD II system runs to make sure the vehicle is operating properly and is running clean. Some monitors run every time the engine is started and the vehicle is driven; however, others only run under certain operating conditions. One of these is the evaporative emissions system monitor (EVAP monitor) that checks for fuel vapor leaks. Many people call this the “loose gas cap monitor” because it may turn on the “Check Engine” light and set a P0440, P0442 or P0445 code if the gas cap is not fully tightened or is left off after refilling the tank. Another monitor that only runs occasionally is the catalyst monitor. This monitor checks the operating efficiency of the catalytic converter. If it senses a drop in efficiency, it will turn on the “Check Engine” light.Why do you need to know readiness status? If all the monitors have run and no faults have been found (no codes set and no “Check Engine” light), it means the vehicle is in emissions compliance, is running clean and should pass either a tailpipe smog check or an OBD II plug-in emissions test.Some people wonder why you can’t just clear the codes before taking an emissions test. Most code readers and scan tools can do just that. Pressing a button wipes the codes from the computer’s memory and turns off the “Check Engine” light. But as soon as the vehicle is driven, the code may reset and the “Check Engine” light may come back on depending on the nature of the problem. That’s where the readiness status comes in. A vehicle is not considered “ready” to take an OBD II plug-in emissions test unless all of the required monitors have run. The EVAP and catalyst monitor are the slowest ones to run, and may require driving the vehicle several days and at various speeds and loads before they will run their self-checks. So until that happens, the vehicle can’t be tested." },
        { "id": "newsTxt2_3", "type": "txt", "url": "", "title": "‘DIY’ Vs ‘PRO’ Scan Tools", "content": "A code reader can provide an inexpensive means of reading and clearing codes, and maybe even checking the status of the OBD II monitors, but that’s all. To read sensor data, history codes, pending codes, etc., you need a “real” scan tool, and the price jumps accordingly. An entry level scan tool with these features starts around $200 and goes up from there.Most DIY scan tools do not have bidirectional communications capability. This is done for liability reasons. Most late-model vehicles have quite a few built-in self-checks that can be performed with a dealer or professional level scan tool, but running these tests requires some know-how, experience and caution. For many situations, the advanced capabilities are not necessary, but when it is needed, there’s no substitute for having a professional-grade scan tool. Pro tools typically start in the $1,500 to $2,000 range, and go up depending on the tool’s capabilities and features.One change that is affecting the type of scan tool required to diagnose late-model vehicles is the introduction of Controller Area Network (CAN) computer systems. CAN engine control systems are much faster and smarter than previous generations of engine control systems. CAN is a high-speed data link that runs 50 times faster than the four existing OBD II communication protocols. The CAN protocol allows multiple control modules to share information, and requires special hardware and software for diagnostics. Consequently, you need a scan tool that is CAN-compliant for some 2003 vehicles, and many 2004-and-newer cars and trucks. Most older scan tools that were manufactured before CAN came along do not have the hardware capabilities to read the faster data and cannot be upgraded." },
        { "id": "newsTxt2_4", "type": "txt", "url": "", "title": "Understanding Codes", "content": "Regardless of what type of code reader or scan tool is used to read codes, an important point to remember is that a code by itself is not a diagnosis. It is a starting point for further testing and diagnosis. The code may tell you the nature of the problem or the circuit that is acting up, but it doesn’t tell you what’s causing it. This is why you can’t necessarily sell a part based on the code that was pulled from a vehicle.The “enable criteria” that sets a code will vary from one vehicle to another, so there are no rules of thumb to guide your diagnosis. You usually need the OEM service information, diagnostic charts, and test specifications to isolate the fault. You also need additional test equipment such as a digital multimeter (possibly a graphing multimeter), digital storage oscilloscope and/or five-gas emissions analyzer to accurately diagnose some driveability and emissions problems — plus a thorough understanding of engine control systems, sensors and onboard diagnostics. In other words, the motorist really should take his or her vehicle to a professional shop.Some higher-end scan tools not only display codes and data, but can also graph sensor waveforms. The ability to graph data makes it easier to see what is actually going on and to compare data." },
        { "id": "newsTxt2_5", "type": "txt", "url": "", "title": "Scan Tool Trends", "content": "In recent years, more and more new diagnostic tools have been introduced from companies such Actron (OTC), Auterra, Autologic, AutoXray (OTC), Baum Tools, Delphi and others. Their products range from entry level code readers to professional grade scan tools that combine scan tool, graphing and emissions functions all in one. Competition is driving down prices and forcing scan tool suppliers to include more features at little or no extra cost. This includes larger displays, color graphics, broader vehicle make and model applications (though European coverage is still limited in most tools to generic OBD II compliant only) and more parameter identification data. This is good news because it means scan tool users get more for their money.Menus have also improved, making the tools much easier to use. Larger screens and color graphics also make it easier to see the data even in bright sunlight. Good visibility reduces the risk of misreading information and is a plus for aging boomers whose eyes may not be as sharp as they were 20 years ago.Another trend we’re seeing is the narrowing gap between OEM dealer scan tools and aftermarket scan tools. A gap still exists and some aftermarket versions of the OEM scan tool have been “decontented”, but other aftermarket scan tools now offer most if not all of the diagnostic capabilities of the factory scan tool.Most professional technicians say the factory OEM scan tools are the best, but can’t afford to own a different scan tool for each and every make of vehicle they work on. So they may have one or two OEM scan tools for the more common makes they service, and an aftermarket “all makes and models” scan tool for the rest.Finally, there is the issue of tool obsolescence. Most scan tools are upgradeable with a plug-in cartridge, memory card or with software downloads. The tool manufacturer may offer free upgrades for a certain period of time, or they may charge an arm and a leg for annual updates. These are important things that need to be considered before a tool is purchased." },
      ],
    },
    {
      "id": "newsTxt3", "title": "GLOBAL OBD AFTERMARKET INDUSTRY TO SURPASS $1.5BN BY 2024", "dataTime": "31, MAR 2019",
      "url": "/Home/img/news/4.png",
      "dec": "On-board Diagnostics (OBD) Aftermarket is expected to cross USD 1.5 billion by 2024; according to a new research report by Global Market Insights, Inc. The increasing emphasis on developing connected vehicle solutions and the growing adoption of IoT technology in the automobile sector are driving the growth of the OBD aftermarket.",
      "detailList": [
        { "id": "newsTxt3_1", "type": "txt", "url": "", "title": "", "content": "On-board Diagnostics (OBD) Aftermarket is expected to cross USD 1.5 billion by 2024; according to a new research report by Global Market Insights, Inc. The increasing emphasis on developing connected vehicle solutions and the growing adoption of IoT technology in the automobile sector are driving the growth of the OBD aftermarket. The increase in vehicle production, particularly LCVs and HCVs, has generated the demand for more stringent emission control standards. The government agencies around the world have implemented stringent emission control regulations to combat the increasing impact of air pollution on the environment." },
        { "id": "newsTxt3_2", "type": "txt", "url": "", "title": "", "content": "The increasing complexities in vehicles have generated the need to have more robust remote diagnostics solutions. Remote diagnostics technology is also gaining more popularity as it provides the vehicle owners and technicians with the real-time information about the vehicle's status and helps in the effective monitoring of vehicle components remotely." },
        { "id": "newsTxt3_3", "type": "txt", "url": "", "title": "", "content": "The passenger vehicles segment held a dominant share of over 40% in 2017 in the global OBD aftermarket. The increased production of passenger vehicles, particularly in the U.S. and China, is majorly contributing to the adoption of OBD telematics solutions in the segment. According to the American Auto Council, the U.S. auto production is expected to exceed 12 million vehicles per year through 2019 and reach 13 million by 2020. As it has been made mandatory by government institutions in various countries to have OBD compatibility for passenger vehicles, the segment is projected to grow consistently during the forecast timeline." },
        { "id": "newsTxt3_4", "type": "txt", "url": "", "title": "", "content": "The hardware segment held a majority share of over 40% in the On-board diagnostics aftermarket in 2017 due to the large-scale adoption of traditional OBD scanners such as scan tools and code readers to access the vehicle's OBD port. These scanners act as an interface to provide users with the vehicles' engine-related parameters. However, with the emergence of OBD dongles, additional information, such as driver behavior analytics and remote diagnostics, can be effectively extracted from vehicles." },
        { "id": "newsTxt3_5", "type": "txt", "url": "", "title": "", "content": "The OBD apps segment is expected to exhibit the fastest growth by 2024 at a CAGR of over 25%. The increasing penetration of smartphones and the adoption of advanced telematics technologies have triggered the demand for mobile-based apps. As the OBD apps reduce the dependency on any hardware to gather information and make it possible for the user to convert the smartphone or tablet into a portable OBD scanner for gathering diagnostic information, the demand for apps is likely to grow during the forecast timeline. These apps handle all the information collected from the OBD systems and ease the task of monitoring the vehicle parameters in the real-time, allowing the continuous monitoring of the vehicle's status." },
        { "id": "newsTxt3_6", "type": "txt", "url": "", "title": "", "content": "The fleet management segment dominated the OBD aftermarket in 2017 with a market share of over 45% and is expected to maintain the dominance throughout the forecast period. The use of OBD in the fleet management software offers effective management of fleet operations and provides access to the real-time data regarding the vehicle's location. It also monitors the driving patterns and helps in early diagnosis and mitigation of any malfunction in the vehicle components. With the significant growth in the electric vehicle technology, the demand for OBD telematics systems for managing and controlling the vehicle components is expected to increase significantly. The fleet management software in electric vehicles helps in increasing the fleet efficiency and reducing the operational costs." },
        { "id": "newsTxt3_7", "type": "txt", "url": "", "title": "", "content": "North America held a major share of the OBD aftermarket in 2017. The proliferation of OBD dongle-based solutions is estimated to grow at a faster pace in the region between 2018 and 2024. The automobile sector in this region continues to record a steady growth due to the high penetration of advanced technologies in the transportation systems and the increased momentum of autonomous vehicles. The presence of some major global automobile players and the increasing investments by foreign auto suppliers in their manufacturing facilities are driving the region's automobile market growth. For instance, in January 2018, Ford planned to invest USD 11 billion in electric vehicles to have 40 hybrid and fully electric vehicles in its model lineup by 2020. Similarly, in April 2016, Nissan made strategic investments in its U.S. operations to meet the growing need of the U.S. consumers. The company has invested around USD 10.8 billion in its U.S. operations since 1981." },
        { "id": "newsTxt3_8", "type": "txt", "url": "", "title": "", "content": "Companies operating in the On-board diagnostics aftermarket focus on offering new products along with strategic acquisitions to leverage their mutual technological capabilities and create innovative offerings. For instance, in April 2018, Quartix launched a new installation option; plug, and track. The new tracking device can be easily installed into the OBD port and it eases the installation and flexibility when moving the tracking function from one vehicle to another without disconnecting the hardwiring. In April 2017, SiriusXM acquired Automatic, the maker of the Automatic Pro and Automatic Lite connected car OBD II ports accessories for USD 10 million. The acquisition enabled the company to expand and improve its connected vehicles services." },
      ],
    },
    {
      "id": "newsTxt4", "title": "MARSHARK LAUNCHES THINKCAR OBD, WORLD'S SMALLEST AND MOST POWERFUL DIAGNOSTIC TOOL", "dataTime": "19, Jul 2019",
      "url": "/Home/img/news/5.jpg",
      "dec": "Marshark proudly launches THINKCAR OBD, world’s smallest and most powerful diagnostic tool, it empowers you to transform your phone into a professional-grade diagnostic tool. The THINKCAR OBD II Scan Tool connects to your mobile device via Bluetooth, easily transferring the fault codes and data from your vehicle’s on board computer.",
      "detailList": [
        { "id": "newsTxt4_1", "type": "img", "url": "/Home/img/news/5_1.jpg", "title": "", "content": "" },
        { "id": "newsTxt4_2", "type": "txt", "url": "", "title": "THINKCAR’s 1/1S OBD Scan Tool", "content": "Marshark proudly launches THINKCAR OBD, world’s smallest and most powerful diagnostic tool, it empowers you to transform your phone into a professional-grade diagnostic tool. The THINKCAR OBD II Scan Tool connects to your mobile device via Bluetooth, easily transferring the fault codes and data from your vehicle’s on board computer." },
        { "id": "newsTxt4_3", "type": "txt", "url": "", "title": "", "content": "Using your phone as your personal 24/7 mechanic makes car maintenance easy. With THINKCAR’s mobile app, anyone can diagnose and identify the root of their vehicle’s problems, regardless of technical knowledge or experience. By better understanding your car, you can decide whether it needs full servicing or just a touch of DIY repair, potentially saving heaps of money from unnecessary trips to the mechanic." },
        { "id": "newsTxt4_4", "type": "txt", "url": "", "title": "", "content": "The THINKCAR 1 and 1S will be launching on Kickstarter as of July 29th. Check out the pre-launch page here and sign up for the email list for exclusive discounts on the product, up to 50% off!" },
        { "id": "newsTxt4_5", "type": "img", "url": "/Home/img/news/5_2.jpg", "title": "", "content": "" },
        { "id": "newsTxt4_6", "type": "txt", "url": "", "title": "How It’s Different", "content": "" },
        { "id": "newsTxt4_7", "type": "txt", "url": "", "title": "Full Vehicle Diagnostics:", "content": "Why does THINKCAR differ from other products? Conventional OBD tools can only scan four major parts of a car, whereas THINKCAR will provide a fully comprehensive test, assessing additional systems of your vehicle such as its ABS, gearbox, and engine. This allows you to enjoy full control over your car’s systems." },
        { "id": "newsTxt4_8", "type": "txt", "url": "", "title": "Remote Diagnostics:", "content": "On top of this tool’s excellent intuition, mechanics using THINKCAR’s app can access your vehicle’s data from anywhere, regardless of distance. Even if you struggle to understand your OBD data, rest assured that anyone with the THINKCAR app can connect to your car and help resolve any concerns." },
        { "id": "newsTxt4_9", "type": "txt", "url": "", "title": "Black Box", "content": "Inspired by aviation, the THINKCAR scan tool features a blackbox function. OBD data from your vehicle is recorded and stored in real time allowing you to access historical data through the app. If you are ever involved in a crash or motor accident, the THINKCAR 1 or 1S functions as a standalone Event Data Recorder. Saved data can be reviewed by technicians to analyze the root cause of the vehicles issues." },
        { "id": "newsTxt4_10", "type": "txt", "url": "", "title": "Cost:", "content": "By subscribing to our promotional email here, you’ll enjoy up to 70% off purchase of THINKCAR Scan Tool. The product will be launched on Kickstarter on July 29th." },
      ],
    },

    // { "id": "newsTxt1", "title": "", "dataTime": "", "url": "" ,"dec": ""},
  ],
  _faq: {
    titleImg: "/Home/img/faq_banner.jpg",
    title: "THINKCAR Q&A",
    dec: "Here are some answers to the questions you might have when you use THINKCAR. If your question is not answered here, please use the feedback feature to send an email to the THINKCAR Support Team. Thank you.",
  },
  productListZh_CN: [
    {
      name: 'THINKCAR1s', price: 89.95, id: '1', "status": "0",
      serviceList: [
        {
          "id": "1", "goodsid": "1", "name": "1year one car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "8.9", "status": "1", "dateline": null, ischeck: false
        },
        {
          "id": "2", "goodsid": "1", "name": "1year two car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "16.95", "status": "1", "dateline": null, ischeck: false
        },
      ],
      'smimg': '',
      'introduction': 'THINKCAR1 meets vehicle deection',
      'description': 'Full Vehicle Modules Scan | Real Time Remote Diagnostics | Black Box | I/M Readiness | Read/Clear Code | Mode 6 | SMOG Check | Data Stream | MIL',
      'serviceTip': 'THINKCAR 1 offer a free vehicle diagnosis service for the first sixty days after purchase. THINKCAR 1s offers one free vehicle diagnosis service for one year, and you can choose to purchase another year of software service.',
      'imgList': [
        { 'url': '/Home/img/thinkcar1s/1.jpg' },
        { 'url': '/Home/img/thinkcar1s/2.jpg' },
        { 'url': '/Home/img/thinkcar1s/3.jpg' },
        { 'url': '/Home/img/thinkcar1s/4.jpg' },
        { 'url': '/Home/img/thinkcar1s/5.jpg' },
        { 'url': '/Home/img/thinkcar1s/6.jpg' },
      ],
      'imgListP': [
        { 'url': '/Home/img/thinkcar1s/p-1.png' },
        { 'url': '/Home/img/thinkcar1s/p-2.png' },
        { 'url': '/Home/img/thinkcar1s/p-3.png' },
        { 'url': '/Home/img/thinkcar1s/p-4.png' },
      ],
      'parameter': [
        { 'title': 'Bluetooth', 'txt': 'BLE5.0' },
        { 'title': 'Standard OBD detection', 'txt': 'stand by' },
        { 'title': 'Real-time car condition', 'txt': 'stand by' },
        { 'title': 'System-wide detechion', 'txt': 'stand by' },
        { 'title': 'OBD data storage', 'txt': 'not support' },
        { 'title': 'Data upload and palyback', 'txt': 'not support' },
        { 'title': 'Operating temperature', 'txt': '-20°C-+60°C' },
        { 'title': 'storage temperature', 'txt': '-40°C-+85°C' },
        { 'title': 'Input', 'txt': '12V≤50mA' },
        { 'title': 'Length*width*height', 'txt': '39mm*45.5mm*22.4mm' },
      ],
    },
    {
      name: 'THINKCAR1', price: 54.95, id: '2', "status": "0",
      serviceList: [
        {
          "id": "1", "goodsid": "1", "name": "1year one car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "8.9", "status": "1", "dateline": null, ischeck: false
        },
        {
          "id": "2", "goodsid": "1", "name": "1year two car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "16.95", "status": "1", "dateline": null, ischeck: false
        },
      ],
      'smimg': '',
      'introduction': 'THINKCAR1S has more services',
      'description': 'Full Vehicle Modules Scan | Real Time Remote Diagnostics | I/M Readiness | Read/Clear Code | Mode 6 | SMOG Check | Data Stream | MIL',
      'serviceTip': 'THINKCAR 1 offer a free vehicle diagnosis service for the first sixty days after purchase. THINKCAR 1s offers one free vehicle diagnosis service for one year, and you can choose to purchase another year of software service.',
      'imgList': [
        { 'url': '/Home/img/thinkcar1s/1.jpg' },
        { 'url': '/Home/img/thinkcar1s/2.jpg' },
        { 'url': '/Home/img/thinkcar1s/3.jpg' },
        { 'url': '/Home/img/thinkcar1s/4.jpg' },
        { 'url': '/Home/img/thinkcar1s/5.jpg' },
        { 'url': '/Home/img/thinkcar1s/6.jpg' },
      ],
      'imgListP': [
        { 'url': '/Home/img/thinkcar1s/p-1.png' },
        { 'url': '/Home/img/thinkcar1s/p-2.png' },
        { 'url': '/Home/img/thinkcar1s/p-3.png' },
        { 'url': '/Home/img/thinkcar1s/p-4.png' },
      ],
      'parameter': [
        { 'title': 'Bluetooth', 'txt': 'BLE5.0' },
        { 'title': 'Standard OBD detection', 'txt': 'stand by' },
        { 'title': 'Real-time car condition', 'txt': 'stand by' },
        { 'title': 'System-wide detechion', 'txt': 'stand by' },
        { 'title': 'OBD data storage', 'txt': 'stand by' },
        { 'title': 'Data upload and palyback', 'txt': 'stand by' },
        { 'title': 'Operating temperature', 'txt': '-20°C-+60°C' },
        { 'title': 'storage temperature', 'txt': '-40°C-+85°C' },
        { 'title': 'Input', 'txt': '12V≤50mA' },
        { 'title': 'Length*width*height', 'txt': '39mm*45.5mm*22.4mm' },
      ],
    },
    {
      name: 'THINKDIAG', price: 189.95, id: '3', "status": "0",
      serviceList: [
        {
          "id": "1", "goodsid": "1", "name": "1year one car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "8.9", "status": "1", "dateline": null, ischeck: false
        },
        {
          "id": "2", "goodsid": "1", "name": "1year two car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "16.95", "status": "1", "dateline": null, ischeck: false
        },
      ],
      'smimg': '',
      'introduction': 'THINKDIAG has more services',
      'description': 'All Systems Full Function | Maintenance Functions | OBD Functions | Special Function | Actuation Test | Read/Clear Code | Read Data Stream | Read Freeze Frame',
      'serviceTip': 'THINKCAR OBD diagnosis can achieve the effect of professional diagnostic device, to process lots of very practical and convenient operation',
      'imgList': [
        { 'url': '/Home/img/thinkdiag/1.jpg' },
        { 'url': '/Home/img/thinkdiag/2.jpg' },
        { 'url': '/Home/img/thinkdiag/3.jpg' },
        { 'url': '/Home/img/thinkdiag/4.jpg' },
        { 'url': '/Home/img/thinkdiag/5.jpg' },
      ],
      'imgListP': [
        { 'url': '/Home/img/thinkdiag/cp1.jpg' },
        { 'url': '/Home/img/thinkdiag/cp2.jpg' },
        { 'url': '/Home/img/thinkdiag/cp3.jpg' },
        { 'url': '/Home/img/thinkdiag/cp4.jpg' },
      ],
      'parameter': [
        { 'title': 'Bluetooth', 'txt': 'BLE4.2' },
        { 'title': 'All Systems Full Function', 'txt': 'stand by' },
        { 'title': 'Maintenance Functions', 'txt': 'stand by' },
        { 'title': 'OBD Functions', 'txt': 'stand by' },
        { 'title': 'Special Function', 'txt': 'stand by' },
        { 'title': 'Operating voltage', 'txt': '9~18V' },
        { 'title': 'Operating current', 'txt': '≤130mA' },
        { 'title': 'Operating temperature', 'txt': '-10 ℃ ~50 ℃' },
        { 'title': 'Connector type', 'txt': '16-PIN' },
        { 'title': 'Dimensions', 'txt': '3.03in x 2.12in x 1.14in' },
      ],
    }
  ],
  productListEn_US: [
    {
      name: 'THINKCAR1s', price: 89.95, id: '1', "status": "0",
      serviceList: [
        {
          "id": "1", "goodsid": "1", "name": "1year one car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "8.9", "status": "1", "dateline": null, ischeck: false
        },
        {
          "id": "2", "goodsid": "1", "name": "1year two car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "16.95", "status": "1", "dateline": null, ischeck: false
        },
      ],
      'smimg': '',
      'introduction': 'THINKCAR1 meets vehicle deection',
      'description': 'Full Vehicle Modules Scan | Real Time Remote Diagnostics | Black Box | I/M Readiness | Read/Clear Code | Mode 6 | SMOG Check | Data Stream | MIL',
      'serviceTip': 'THINKCAR 1 offer a free vehicle diagnosis service for the first sixty days after purchase. THINKCAR 1s offers one free vehicle diagnosis service for one year, and you can choose to purchase another year of software service.',
      'imgList': [
        { 'url': '/Home/img/thinkcar1s/1.jpg' },
        { 'url': '/Home/img/thinkcar1s/2.jpg' },
        { 'url': '/Home/img/thinkcar1s/3.jpg' },
        { 'url': '/Home/img/thinkcar1s/4.jpg' },
        { 'url': '/Home/img/thinkcar1s/5.jpg' },
        { 'url': '/Home/img/thinkcar1s/6.jpg' },
      ],
      'imgListP': [
        { 'url': '/Home/img/thinkcar1s/p-1.png' },
        { 'url': '/Home/img/thinkcar1s/p-2.png' },
        { 'url': '/Home/img/thinkcar1s/p-3.png' },
        { 'url': '/Home/img/thinkcar1s/p-4.png' },
      ],
      'parameter': [
        { 'title': 'Bluetooth', 'txt': 'BLE5.0' },
        { 'title': 'Standard OBD detection', 'txt': 'stand by' },
        { 'title': 'Real-time car condition', 'txt': 'stand by' },
        { 'title': 'System-wide detechion', 'txt': 'stand by' },
        { 'title': 'OBD data storage', 'txt': 'not support' },
        { 'title': 'Data upload and palyback', 'txt': 'not support' },
        { 'title': 'Operating temperature', 'txt': '-20°C-+60°C' },
        { 'title': 'storage temperature', 'txt': '-40°C-+85°C' },
        { 'title': 'Input', 'txt': '12V≤50mA' },
        { 'title': 'Length*width*height', 'txt': '39mm*45.5mm*22.4mm' },
      ],
    },
    {
      name: 'THINKCAR1', price: 54.95, id: '2', "status": "0",
      serviceList: [
        {
          "id": "1", "goodsid": "1", "name": "1year one car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "8.9", "status": "1", "dateline": null, ischeck: false
        },
        {
          "id": "2", "goodsid": "1", "name": "1year two car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "16.95", "status": "1", "dateline": null, ischeck: false
        },
      ],
      'smimg': '',
      'introduction': 'THINKCAR1S has more services',
      'description': 'Full Vehicle Modules Scan | Real Time Remote Diagnostics | I/M Readiness | Read/Clear Code | Mode 6 | SMOG Check | Data Stream | MIL',
      'serviceTip': 'THINKCAR 1 offer a free vehicle diagnosis service for the first sixty days after purchase. THINKCAR 1s offers one free vehicle diagnosis service for one year, and you can choose to purchase another year of software service.',
      'imgList': [
        { 'url': '/Home/img/thinkcar1s/1.jpg' },
        { 'url': '/Home/img/thinkcar1s/2.jpg' },
        { 'url': '/Home/img/thinkcar1s/3.jpg' },
        { 'url': '/Home/img/thinkcar1s/4.jpg' },
        { 'url': '/Home/img/thinkcar1s/5.jpg' },
        { 'url': '/Home/img/thinkcar1s/6.jpg' },
      ],
      'imgListP': [
        { 'url': '/Home/img/thinkcar1s/p-1.png' },
        { 'url': '/Home/img/thinkcar1s/p-2.png' },
        { 'url': '/Home/img/thinkcar1s/p-3.png' },
        { 'url': '/Home/img/thinkcar1s/p-4.png' },
      ],
      'parameter': [
        { 'title': 'Bluetooth', 'txt': 'BLE5.0' },
        { 'title': 'Standard OBD detection', 'txt': 'stand by' },
        { 'title': 'Real-time car condition', 'txt': 'stand by' },
        { 'title': 'System-wide detechion', 'txt': 'stand by' },
        { 'title': 'OBD data storage', 'txt': 'stand by' },
        { 'title': 'Data upload and palyback', 'txt': 'stand by' },
        { 'title': 'Operating temperature', 'txt': '-20°C-+60°C' },
        { 'title': 'storage temperature', 'txt': '-40°C-+85°C' },
        { 'title': 'Input', 'txt': '12V≤50mA' },
        { 'title': 'Length*width*height', 'txt': '39mm*45.5mm*22.4mm' },
      ],
    },
    {
      name: 'THINKDIAG', price: 189.95, id: '3', "status": "0",
      serviceList: [
        {
          "id": "1", "goodsid": "1", "name": "1year one car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "8.9", "status": "1", "dateline": null, ischeck: false
        },
        {
          "id": "2", "goodsid": "1", "name": "1year two car", "smimg": "Application/Api/Public/images/1car.jpg",
          "price": "16.95", "status": "1", "dateline": null, ischeck: false
        },
      ],
      'smimg': '',
      'introduction': 'THINKDIAG has more services',
      'description': 'All Systems Full Function | Maintenance Functions | OBD Functions | Special Function | Actuation Test | Read/Clear Code | Read Data Stream | Read Freeze Frame',
      'serviceTip': 'THINKCAR OBD diagnosis can achieve the effect of professional diagnostic device, to process lots of very practical and convenient operation',
      'imgList': [
        { 'url': '/Home/img/thinkdiag/1.jpg' },
        { 'url': '/Home/img/thinkdiag/2.jpg' },
        { 'url': '/Home/img/thinkdiag/3.jpg' },
        { 'url': '/Home/img/thinkdiag/4.jpg' },
        { 'url': '/Home/img/thinkdiag/5.jpg' },
      ],
      'imgListP': [
        { 'url': '/Home/img/thinkdiag/cp1.jpg' },
        { 'url': '/Home/img/thinkdiag/cp2.jpg' },
        { 'url': '/Home/img/thinkdiag/cp3.jpg' },
        { 'url': '/Home/img/thinkdiag/cp4.jpg' },
      ],
      'parameter': [
        { 'title': 'Bluetooth', 'txt': 'BLE4.2' },
        { 'title': 'All Systems Full Function', 'txt': 'stand by' },
        { 'title': 'Maintenance Functions', 'txt': 'stand by' },
        { 'title': 'OBD Functions', 'txt': 'stand by' },
        { 'title': 'Special Function', 'txt': 'stand by' },
        { 'title': 'Operating voltage', 'txt': '9~18V' },
        { 'title': 'Operating current', 'txt': '≤130mA' },
        { 'title': 'Operating temperature', 'txt': '-10 ℃ ~50 ℃' },
        { 'title': 'Connector type', 'txt': '16-PIN' },
        { 'title': 'Dimensions', 'txt': '3.03in x 2.12in x 1.14in' },
      ],
    }
  ],

  // shipping
  shippingZh_CN: [
    { id: 'tc_ship_1', title: 'Express Shipping', price: 10, isDisabled: false, description: 'United States:1-2 days , Mexico and Cananda:3-7 days' },
    { id: 'tc_ship_2', title: 'Free', price: 0, isDisabled: false, description: 'United States:3-5 days ' },
  ],
  shippingEn_US: [
    { id: 'tc_ship_1', title: 'Express Shipping', price: 10, isDisabled: false, description: 'United States:1-2 days , Mexico and Cananda:3-7 days' },
    { id: 'tc_ship_2', title: 'Free', price: 0, isDisabled: false, description: 'United States:3-5 days ' },
  ],


  // paymentMehtod
  paymentMehtodZh_CN: [
    { id: 'tc_payment_1', title: 'PayPal', img: '/Home/img/logo_PayPal.png' },
    { id: 'tc_payment_2', title: 'Credit Card', img: '/Home/img/icon-cards.png' },
  ],
  paymentMehtodEn_US: [
    { id: 'tc_payment_1', title: 'PayPal', img: '/Home/img/logo_PayPal.png' },
    { id: 'tc_payment_2', title: 'Credit Card', img: '/Home/img/icon-cards.png' },
  ],

}


export { initData as default } 