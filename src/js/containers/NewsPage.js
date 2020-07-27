import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Row, Col, Card, Icon } from 'antd';
import Loading from '../components/Loading'


const { Meta } = Card;
const _tcImg = "/Home/img/";
const _path1 = 'https://mythinkcar.com';

class NewsPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      // 新闻
      _newsPageTxtList: [
        {
          "id": "ne14", "title": "System upgrade and maintenance notice", "dataTime": "30, May 2020",
          "url": _tcImg + "news/3.jpg",
          "dec": "Please be informed that we will conduct system upgrade and maintenances on 30th Sat 19:00 till 31st Sun 3:00 PST. Thus ThinkCar series products: THINKCAR1S, THINKDIAG, THINKTOOL, THINKPLUS, THINKDRIVER software will be momentarily unable to be downloaded or upgraded during 30th 19:00- 31st 3:00.",
          "detailList": [
            { "id": "ne14_1", "type": "txt", "url": "", "title": "Dear ThinkCar clients", "content": "" },
            { "id": "ne14_2", "type": "txt", "url": "", "title": "", "content": "Please be informed that we will conduct system upgrade and maintenances on 30th Sat 19:00 till 31st Sun 3:00 PST. Thus ThinkCar series products: THINKCAR1S, THINKDIAG, THINKTOOL, THINKPLUS, THINKDRIVER software will be momentarily unable to be downloaded or upgraded during 30th 19:00- 31st 3:00." },
            { "id": "ne14_3", "type": "txt", "url": "", "title": "", "content": "If you have any questions, please contact customer service at 1-833-692-2766." },
            { "id": "ne14_4", "type": "txt", "url": "", "title": "", "content": "We are sorry for this inconvenience might cause and appreciate for your understanding and cooperation. " },
            { "id": "ne14_5", "type": "txt", "url": "", "title": "", "content": "ThinkCar Tech" },
          ],
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "n13", "title": "ThinkTool Video Scope", "dataTime": "09, May 2020",
          "url": _tcImg + "news/13.png",
          "dec": "Video Scopes are widely used in vehicle production and maintenance.",
          "detailList": [
            { "id": "newsTxt13_1", "type": "img", "url": _tcImg + "news/13.png", "title": "", "content": "" },
            { "id": "newsTxt13_2", "type": "txt", "url": "", "title": "Video Scopes are widely used in vehicle production and maintenance.", "content": "" },
            { "id": "newsTxt13_3", "type": "txt", "url": "", "title": "", "content": "Video scope is mainly used in detection and diagnosis of vehicle engine, cylinder, hydraulic parts, fuel, muffler, transmission, differential, air conditioning system of water tank, oil tank, gear box, carbon deposit, and jam, etc. It avoids unnecessary damages caused by auto parts dis-assembly and significantly improve the efficiency of maintenance work, reducing the maintenance cost." },
            { "id": "newsTxt13_4", "type": "txt", "url": "", "title": "When it comes to the cleaning and maintenance of vehicle engine, video scope is also a significant tool for daily use.  ", "content": "" },
            { "id": "newsTxt13_5", "type": "txt", "url": "", "title": "Multipurpose connector adapts to all kinds of complex maintenance scenarios.", "content": "" },
            { "id": "newsTxt13_6", "type": "txt", "url": "", "title": "", "content": "The ThinkTool video scope with aviation connector is pioneered by Thinkcar company. It is equipped with three kinds of special thread ends (hook, side mirror and magnet) to adapt to various complex environments. The special hook helps to clear small clutter; The side mirror can expand the observation angle and range. The magnet can clean things like small screws, metal fragments and other foreign objects left in narrow spaces. " },
            { "id": "newsTxt13_7", "type": "txt", "url": "", "title": "", "content": "The 1200mm extra long customized coil can be optionally bent to reach any hidden places that need to be inspected. Flexible and compact with simple operations. " },
            { "id": "newsTxt13_8", "type": "txt", "url": "", "title": "7 inches HD screen display, photos and videos supported. ", "content": "" },
            { "id": "newsTxt13_9", "type": "txt", "url": "", "title": "", "content": "The video scope can be used with ThinkTool. With 7 inches HD screen display, it supports photos and videos taking. HD resolution lens, megapixels, and 6 auxiliary LED lights which can easily meet the requirements of all kinds of diagnostics under dark environments. To see deeper and clearer, ThinkTool performs professional and fantastic diagnostics even in the darkness. " },
            { "id": "newsTxt13_10", "type": "txt", "url": "", "title": "", "content": "ThinkTool, a multi-purpose scan tool, brings convenient diagnostics. For more intelligent diagnostic solutions, please follow us on our WeChat official account. " },
            { "id": "newsTxt13_11", "type": "txt", "url": "", "title": "", "content": "Thinkcar TikTok account: Thinkcartech" },
          ],
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "n12", "title": "TPMS Reset", "dataTime": "30, Apr 2020",
          "url": _tcImg + "news/12.png",
          "dec": "When the tire pressure fault light is on, it is necessary to reset the tire pressure through tire pressure reset function after maintenance. In the case of tire pressure is too low or leak, replace or add tire pressure monitor equipment, replace tires, tire pressure sensor damage, the vehicle with tire pressure monitoring function should reset the tire pressure after maintenance.",
          "detailList": [
            { "id": "newsTxt12_1", "type": "img", "url": _tcImg + "news/12.png", "title": "", "content": "" },
            { "id": "newsTxt12_2", "type": "txt", "url": "", "title": "", "content": "When the tire pressure fault light is on, it is necessary to reset the tire pressure through tire pressure reset function after maintenance. In the case of tire pressure is too low or leak, replace or add tire pressure monitor equipment, replace tires, tire pressure sensor damage, the vehicle with tire pressure monitoring function should reset the tire pressure after maintenance." },
            { "id": "newsTxt12_3", "type": "txt", "url": "", "title": "", "content": "Tire pressure monitor system can be divided into direct tire pressure monitor and indirect tire pressure monitor" },
            { "id": "newsTxt12_4", "type": "txt", "url": "", "title": "", "content": "Direct tire pressure monitor system is to install the sensor on the wheel hub and you can directly monitor the pressure. " },
            { "id": "newsTxt12_5", "type": "txt", "url": "", "title": "", "content": "Indirect tire pressure monitor system relies on the ABS sensor to monitor if the speed of four wheels are the same, so as to monitor tire pressure. " },
            { "id": "newsTxt12_6", "type": "txt", "url": "", "title": "", "content": "The indirect tire pressure monitor system needs to check the tire pressure of the four wheels when the tire pressure fault light is on. After the air pressure is even, a decoder is needed to reset the tire pressure. Some vehicles have a tire pressure reset button which you can press to directly reset." },
            { "id": "newsTxt12_7", "type": "txt", "url": "", "title": "", "content": "Operations: Please plug ThinkDiag into the OBD port of your vehicle, then open the ThinkDiag App and log in to your account. Select MAINTENANCE FUNCTIONS and select RESETTPMS, then select the vehicle model. Please make the selections according to the notifications. Some vehicles support automatic reset while others don’t. If your vehicle does not support automatic reset please select manual reset." },
            { "id": "newsTxt12_8", "type": "txt", "url": "", "title": "", "content": "Note: if the tire pressure fault light is on, please check the tire pressure as soon as possible. Because driving under the condition of insufficient tire pressure will lead to excessive tire body buckling. Excessive tire body buckling will produce high heat, and the inner air-tight rubber will be burned into black spots, and then the rubber and tire cord fabric will be stripped off. More seriously, the air-tight layer of rubber will be heated to melt, resulting in melting, sustained high heat will seriously damage the internal structure. If the vehicle continues to run under such condition, it will eventually cause tire damage. When the situation is not serious,  it may cause the vehicle to deviate from the direction. If the vehicle is running at a high speed, it will cause a flat tire and roll over. Therefore, please check the tire pressure as soon as possible once the tire pressure fault light is on. " },
            { "id": "newsTxt12_9", "type": "img", "url": _tcImg + "news/12_1.jpg", "title": "", "content": "" },
            { "id": "newsTxt12_10", "type": "img", "url": _tcImg + "news/12_2.jpg", "title": "", "content": "" },
            { "id": "newsTxt12_11", "type": "img", "url": _tcImg + "news/12_3.jpg", "title": "", "content": "" },
          ],
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "n11", "title": "What should I do if the engine fault light is on?", "dataTime": "24, Apr 2020",
          "url": _tcImg + "news/11.jpg",
          "dec": "If you find that the engine light is on while driving, please do not panic, just stop and shut down the vehicle. Normally the personal vehicle owner does not know how to deal with it. Open the engine cover but has no idea of what to do next. However, if you have the ThinkDriver, you can use ThinkDriver to complete a quick diagnostics. It will find out the problem quickly and correctly. ",
          "detailList": [
            { "id": "newsTxt11_1", "type": "img", "url": _tcImg + "news/11.jpg", "title": "", "content": "" },
            { "id": "newsTxt11_2", "type": "txt", "url": "", "title": "", "content": "If you find that the engine light is on while driving, please do not panic, just stop and shut down the vehicle. Normally the personal vehicle owner does not know how to deal with it. Open the engine cover but has no idea of what to do next. However, if you have the ThinkDriver, you can use ThinkDriver to complete a quick diagnostics. It will find out the problem quickly and correctly. " },
            { "id": "newsTxt11_3", "type": "txt", "url": "", "title": "So, what is ThinkDriver?", "content": "" },
            { "id": "newsTxt11_4", "type": "txt", "url": "", "title": "", "content": " ThinkDriver is a professional DIY diagnostic tool, which is not just a standard OBD II scanner. ThinkDriver can diagnose the full system of vehicles, which is far functional beyond normal OBD II scanner. " },
            { "id": "newsTxt11_5", "type": "txt", "url": "", "title": "How to use ThinkDriver?", "content": "" },
            { "id": "newsTxt11_6", "type": "txt", "url": "", "title": "", "content": " It is easy to use this fantastic product. You only need to get a ThinkDriver, download the ThinkDriver app and log in to your account(register first if you do not have one). In the homepage, there are four functional options: Full System Diagnostics, OBD Functions, Flashlight and Acceleration Timer. If the fault light is on, you can plug the ThinkDriver into the OBD port of the vehicle and choose Full System Diagnostics to diagnose. " },
            { "id": "newsTxt11_7", "type": "txt", "url": "", "title": "", "content": "ThinkDriver will automatically scan the VIN to identify the model and year of the vehicle. You just need to confirm and enter the vehicle full system diagnostics, then choose the diagnostic connector (most of the vehicles are 16 PIN except a few models). After choosing the model and year, you will see the vehicle info with VIN, vehicle name, model code, engine type, year and the number of cylinders. Click on “OK” and a  notification will appear. Click on “OK” again and then select quick full system scan. It may take a few minutes." },
            { "id": "newsTxt11_8", "type": "txt", "url": "", "title": "", "content": "After the scan you can easily check all the systems and if there is any problems. Select the system with fault code. Engine system, for example, choose engine and gearbox systems, there will be three options: read fault code, clear fault code and read data stream. Select fault code reading and you will find out the cause of failure. After solving the problem, choose to clear the fault code and turn off the engine fault light. Finally, you can check data stream to see if the vehicle is running normally. After the completed diagnostics, ThinkDriver will provide a detailed diagnostic report with all the results. " },
            { "id": "newsTxt11_9", "type": "img", "url": _tcImg + "news/11_1.jpg", "title": "", "content": "" },
            { "id": "newsTxt11_10", "type": "img", "url": _tcImg + "news/11_2.jpg", "title": "", "content": "" },
          ],
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "n10", "title": "How to Throttle Match for BEGINNERS?", "dataTime": "14, Apr 2020",
          "url": _tcImg + "news/10.jpg",
          "dec": "Throttle matching is to use the automobile decoder to initialize the throttle element of the vehicle, to make the learning value of ECU return to the initial condition, so as to more accurately control and adjust the throttle (or idle motor) action, in order to regulate the air intake.",
          "detailList": [
            { "id": "newsTxt10_1", "type": "img", "url": _tcImg + "news/10.jpg", "title": "", "content": "" },
            { "id": "newsTxt10_2", "type": "txt", "url": "", "title": "", "content": "Throttle matching is to use the automobile decoder to initialize the throttle element of the vehicle, to make the learning value of ECU return to the initial condition, so as to more accurately control and adjust the throttle (or idle motor) action, in order to regulate the air intake." },
            { "id": "newsTxt10_3", "type": "txt", "url": "", "title": "Throttle matching is required in following conditions: ", "content": "" },
            { "id": "newsTxt10_4", "type": "txt", "url": "", "title": "", "content": "1. After replacing the electronic control unit, no characteristic related to throttle operation is stored in the new electronic control unit, so throttle matching is required." },
            { "id": "newsTxt10_5", "type": "txt", "url": "", "title": "", "content": "2. When the electronic control unit is powered off, the memory of the electronic control unit memory is lost, then the throttle matching is required." },
            { "id": "newsTxt10_6", "type": "txt", "url": "", "title": "", "content": "3. After replacing the electronic throttle assembly, throttle matching is required." },
            { "id": "newsTxt10_7", "type": "txt", "url": "", "title": "", "content": "4. After replacing or disassembling the inlet port, the control of idle speed in the coordination between the electronic control unit and throttle body will be affected, so throttle matching is needed." },
            { "id": "newsTxt10_8", "type": "txt", "url": "", "title": "", "content": "5. After cleaning the throttle, the characteristics of the idle throttle potentiometer have not changed, but the air intake has changed under the same throttle opening, and the idle control characteristics have changed. At this time, throttle matching is required." },
            { "id": "newsTxt10_9", "type": "txt", "url": "", "title": "Caution: ", "content": "" },
            { "id": "newsTxt10_10", "type": "txt", "url": "", "title": "", "content": "If there are the above situations, directly starting the engine without throttle matching will lead to abnormal idling speed of the engine. If the engine runs for a long time, it will lead to increased fuel consumption, engine jitters , engine fault lights on and other problems which affect safe driving." },
            { "id": "newsTxt10_11", "type": "txt", "url": "", "title": "How to fix your car by yourself?", "content": "" },
            { "id": "newsTxt10_12", "type": "txt", "url": "", "title": "", "content": "<a href='" + _path1 + "/product/3/t1' target='_blank'>THINKDIAG</a> offers a full package of diagnostic solutions for you. Get a <a href='" + _path1 + "/product/3/t1' target='_blank'>THINKDIAG</a> and solve all the above issues in just a few seconds!" },
            { "id": "newsTxt10_13", "type": "img", "url": _tcImg + "news/10_3.png", "title": "", "content": "" },
            { "id": "newsTxt10_14", "type": "txt", "url": "", "title": "How to operate throttle matching with THINKDIAG?", "content": "" },
            { "id": "newsTxt10_15", "type": "txt", "url": "", "title": "", "content": "1. Plug <a href='" + _path1 + "/product/3/t1' target='_blank'>THINKDIAG</a> into the OBD2 port of your car. " },
            { "id": "newsTxt10_16", "type": "txt", "url": "", "title": "", "content": "2. Open the <a href='" + _path1 + "/product/3/t1' target='_blank'>THINKDIAG</a> app and log into your account. Bluetooth connect with your phone. " },
            { "id": "newsTxt10_17", "type": "txt", "url": "", "title": "", "content": "3. Select MAINTENANCE FUNCTIONS and click on RESETETS, then select the model." },
            { "id": "newsTxt10_18", "type": "txt", "url": "", "title": "", "content": "4. Turn on the ignition switch according to the prompts, and then carefully check the learning condition of the section (if the condition is not reached, it is not recommended to match the throttle) and click on OK. Choose to automatically match or manually match (If it is not sure, please click on HELP). If you select automatic matching, there is no need to further operate. If you select manual matching, you need to follow the instructions to operate. After that, you need to turn on the ignition switch to check if the idle speed is normal, and if it’s too high or too low to be finished matching. " },
            { "id": "newsTxt10_19", "type": "txt", "url": "", "title": "Note: ", "content": "" },
            { "id": "newsTxt10_20", "type": "txt", "url": "", "title": "", "content": "The menu page of different models may be different, and the manual matching operation method may different. Please follow the system instructions." },

          ],
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "newsTxt9", "title": "What if my Service Light is on?", "dataTime": "10, Apr 2020",
          "url": _tcImg + "news/9.jpg",
          "dec": "It means your vehicle needs service once the service light is on. Please service your vehicle to avoid causing potential problems to your car. After you finished, please reset the mileage or the maintenance period, then the service light will turn off. And a new maintenance period would starts.",
          "detailList": [
            { "id": "newsTxt9_1", "type": "img", "url": _tcImg + "news/9.jpg", "title": "", "content": "" },
            { "id": "newsTxt9_2", "type": "txt", "url": "", "title": "", "content": "It means your vehicle needs service once the service light is on. Please service your vehicle to avoid causing potential problems to your car. After you finished, please reset the mileage or the maintenance period, then the service light will turn off. And a new maintenance period would starts." },
            { "id": "newsTxt9_3", "type": "img", "url": _tcImg + "news/9_1.jpg", "title": "", "content": "" },
            { "id": "newsTxt9_4", "type": "txt", "url": "", "title": "How to reset service light?", "content": "" },
            { "id": "newsTxt9_5", "type": "txt", "url": "", "title": "", "content": "Door A: Turn to a mechanics and charge a few hundred bulks." },
            { "id": "newsTxt9_6", "type": "txt", "url": "", "title": "", "content": "Door B: Use <a href='" + _path1 + "/product/3/t1' target='_blank'>THINKDIAG</a>, and reset in few seconds." },
            { "id": "newsTxt9_7", "type": "txt", "url": "", "title": "", "content": "DIY and reset the service by yourself. Here we go!" },
            { "id": "newsTxt9_8", "type": "img", "url": _tcImg + "news/9_2.jpg", "title": "", "content": "" },
            { "id": "newsTxt9_9", "type": "txt", "url": "", "title": "", "content": "First connect THINKDIAG to your car's OBD port, open THINKDIAG APP, log in to your account, select MAINTENANCE FUNCTIONS, then select RESETOIL, choose your car brand, follow the system prompts to operate. Some brands support automatic reset, for those that do not support automatic reset please choose manual reset, follow the system prompts to manual reset." },
            { "id": "newsTxt9_10", "type": "txt", "url": "", "title": "", "content": "That’s it. Easy diagnose with THINKDIAG. " },
          ],
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "newsTxt6", "title": "ThinkDriver Bluetooth vehicle diagnostic tool", "dataTime": "31, MAR 2020",
          "url": _tcImg + "news/6_1.jpg",
          "dec": "ThinkDriver is a new vehicle diagnostic tool which has been specifically created to help make vehicle diagnosis easier using the power of your smartphone and the Bluetooth adapter. Together the system provides detailed diagnostic reports on your vehicle directly to your smartphone thanks to its Bluetooth connectivity.",
          "detailList": [
            { "id": "newsTxt6_1", "type": "img", "url": _tcImg + "news/6_1.jpg", "title": "", "content": "" },
            { "id": "newsTxt6_2", "type": "txt", "url": "", "title": "", "content": "ThinkDriver is a new vehicle diagnostic tool which has been specifically created to help make vehicle diagnosis easier using the power of your smartphone and the Bluetooth adapter. Together the system provides detailed diagnostic reports on your vehicle directly to your smartphone thanks to its Bluetooth connectivity." },
            { "id": "newsTxt6_3", "type": "txt", "url": "", "title": "", "content": "Watch the demonstration video below to learn more about the intelligent vehicle scanner available via Kickstarter from just $36. If all goes to plan worldwide shipping is expected to take place in a few months time during June 2020." },
            { "id": "newsTxt6_4", "type": "txt", "url": "", "title": "", "content": "“THINKCAR is the earliest OBDII Bluetooth diagnostic tool for full vehicle systems in the market full of basic tools with few functions. THINKDIAG, with the same functions but lower price than the professional diagnostic tools which always cost thousands of dollars. The whole system is diagnosed through the mobile app. Users can choose the car brand they need. Then THINKDIAG successfully got the reputation.”" },
            { "id": "newsTxt6_5", "type": "txt", "url": "", "title": "", "content": "“THINKDIAG, with the same functions but lower price than the professional diagnostic tools which always cost thousands of dollars. The whole system is diagnosed through the mobile app. Users can choose the car brand they need. Then THINKDIAG successfully got the reputation.”" },
            { "id": "newsTxt6_6", "type": "img", "url": _tcImg + "news/6_2.jpg", "title": "", "content": "" },
            { "id": "newsTxt6_7", "type": "txt", "url": "", "title": "", "content": "“THINKDRIVER is based on THIKDIAG, but we optimize the cost and reduce functions for professional mechanics. We strive to minimize the price of THINKDRIVER to let all car owners test the full system of the vehicle, much more than the OBDII. There are no requirements of diagnostic knowledge. THINKDRIVER’s professional features allow anyone to easily use it without any technical training. THINKDRIVER is extremely smart with its outstanding performance.”" },
          ],
          "isRep": true, "author": "Julian Horsey", "repUrl": "https://www.geeky-gadgets.com/vehicle-diagnostic-tool-31-03-2020",
        },
        {
          "id": "newsTxt7", "title": "ADVANTAGES OF CAR DIAGNOSTIC TOOLS", "dataTime": "30, MAR 2020",
          "url": _tcImg + "news/7.jpg",
          "dec": "Yearly examinations from your medical professional maintain you healthily, right? Well, the exact same goes with your vehicle, routine analysis examinations can identify issues with your automobile prior to it calls for costly repair work, or even worse, you get stranded while making you stand at the side of the road after a breakdown. And also, while lots of people think diagnostic tools are just necessary when the check engine light comes on, there are several advantages to taking an aggressive method to vehicle upkeep.",
          "detailList": [
            { "id": "newsTxt7_1", "type": "img", "url": _tcImg + "news/7.jpg", "title": "", "content": "" },
            { "id": "newsTxt7_2", "type": "txt", "url": "", "title": "", "content": "Yearly examinations from your medical professional maintain you healthily, right? Well, the exact same goes with your vehicle, routine analysis examinations can identify issues with your automobile prior to it calls for costly repair work, or even worse, you get stranded while making you stand at the side of the road after a breakdown. And also, while lots of people think diagnostic tools are just necessary when the check engine light comes on, there are several advantages to taking an aggressive method to vehicle upkeep. Here’s why:" },
            { "id": "newsTxt7_3", "type": "txt", "url": "", "title": "WHAT IS A CAR DIAGNOSTIC TEST?", "content": "Of all the technological advancements in the auto market over the years, one of the most beneficial to consumers and vehicle service technicians alike has actually been the computerization of the car parts. Making use of specific software programs, car diagnostic tools quickly and precisely point to problem areas in a vehicle’s engine or somewhere else, many thanks to integrated CPUs, microchips as well as sensing units." },
            { "id": "newsTxt7_4", "type": "txt", "url": "", "title": "WHAT CAN AREAS OF THE CARS BE CHECKED?", "content": "Diagnostic tests can expose problems within a car engine, exhaust system, transmission, brakes, as well as various other major parts, as well as efficiency issues with the fuel injector, air circulation, and also ignition coils, coolant, as well as throttle." },
            { "id": "newsTxt7_5", "type": "txt", "url": "", "title": "", "content": "Nonetheless, a usual misunderstanding about auto diagnostic tests is that specialists can utilize code-reading tools to identify the precise issue that caused the check engine light. In truth, the code tells specialists which engine or component parameters are out of range, but it does not detail the root cause of the problems. That’s where the great old human mind is available for convenience, as the service technician utilizes experience as well as skill to identify the underlying issue." },
            { "id": "newsTxt7_6", "type": "txt", "url": "", "title": "WHAT ARE THE BENEFITS OF AN AUTOMOBILE DIAGNOSTIC TEST?", "content": "Prior to the appearance of car analysis examinations, recognizing problems was lengthy as well as pricey, particularly taking into consideration auto proprietors just brought their vehicles to mechanics after a malfunction or other serious malfunction. Now, computerized car parts can detect troubles long prior to they can cause a malfunction. Analysis devices can additionally examine a car’s computer system for producer notifications and stored info concerning the automobile’s history, offering service technicians a total image in order to perform the most effective fixing possible." },
          ],
          "isRep": true, "author": "Paul Petersen", "repUrl": "https://www.thenewautomag.com/advantages-of-car-diagnostic-tools",
        },
        {
          "id": "newsTxt8", "title": "CAR DIAGNOSTIC TOOL: LET’S KNOW ABOUT IT", "dataTime": "30, MAR 2020",
          "url": _tcImg + "news/8.jpg",
          "dec": "Executing an automobile diagnostic can disclose a number of troubles connected with the transmission, gas tank, oil container, exhaust system as well as other elements of the car. Modern cars designed with computer system processors, microchips as well as sensing units can be connected to an auto car diagnostic tool scans to pinpoint precisely where the issue exists. The scans are done at a certified mechanic’s garage or at the dealership. A few scans can be done in the house, making use of a scanning tool that can be hand-held.",
          "detailList": [
            { "id": "newsTxt8_1", "type": "img", "url": _tcImg + "news/8.jpg", "title": "", "content": "" },
            { "id": "newsTxt8_2", "type": "txt", "url": "", "title": "", "content": "Executing an automobile diagnostic can disclose a number of troubles connected with the transmission, gas tank, oil container, exhaust system as well as other elements of the car. Modern cars designed with computer system processors, microchips as well as sensing units can be connected to an auto car diagnostic tool scans to pinpoint precisely where the issue exists. The scans are done at a certified mechanic’s garage or at the dealership. A few scans can be done in the house, making use of a scanning tool that can be hand-held." },
            { "id": "newsTxt8_3", "type": "txt", "url": "", "title": "History", "content": "In 1996 the EPA mandated that the computer interface of all cars sold in the United States needed to satisfy the On-Board Diagnostics, variation II, or OBD II requirement. This implied that aftermarket service center would be able to detect a problem in the automobile using just one set of devices as well as running a simple computer system check. This is now known as the car’s analysis examination; the process involves producing a total report with a collection of codes that pertain to different issues." },
            { "id": "newsTxt8_4", "type": "txt", "url": "", "title": "Results", "content": "The cars’ analysis can inform you the complying with regarding the automobile: ignition time issues, level of accumulation inside the combustion engine, gas injector efficiency, whether there are firing of ignition coils, coolant temperature, engine RPM levels, air, crankshaft as well as camshaft setting as well as the opening of the throttle. After the cars’ analysis is executed, the computer system will mark every data point and reveal what needs to be dealt with and stores this code to make sure that the professional can search in a details location for the trouble." },
            { "id": "newsTxt8_5", "type": "txt", "url": "", "title": "Prices", "content": "The price of a typical car analysis can vary from $20 to $400 depending upon the sort of scanner used, as well as the make as well as version of the automobile. Consumer code readers are readily available, but these only provide minimal information on the resource of the trouble." },
            { "id": "newsTxt8_6", "type": "txt", "url": "", "title": "Benefits", "content": "Performing a car analysis examination making use of an auto check device can conserve the auto mechanic a lot of time repairing a problem as well as save the vehicle owner money due to the fact that they do not need to pay for a full mechanical check at their local repair shop. When the “Inspect Engine” light shows up in the control panel, the automobile owner has no suggestion of what might be causing the problem. Running an electronic automobile diagnostic tool check can highlight the problem to ensure that the technician can fix only what needs to be dealt with. Most auto diagnostic checks can be executed in under an hour." },
          ],
          "isRep": true, "author": "Clare Louise", "repUrl": "https://toyotasimulator.com/car-diagnostic-tool-lets-know-about-it",
        },

        {
          "id": "newsTxt1", "title": "HERE’S ALL YOU NEED TO KNOW ABOUT OBD/OBD II", "dataTime": "31, MAR 2019",
          "url": _tcImg + "news/2.png",
          "dec": "Regardless of your vehicle repair skill level, using an OBD-II code scanner is simple and straightforward. Before you get started, make sure to read the scan tool’s user manual and documentation. Whether it’s handheld, wireless or built into your vehicle, an OBD-II scanner is a great way to diagnose many vehicle repairs inexpensively and easily.",
          "detailList": [
            { "id": "newsTxt1_1", "type": "img", "url": _tcImg + "news/2_1.jpg", "title": "", "content": "" },
            { "id": "newsTxt1_2", "type": "txt", "url": "", "title": "", "content": "You never know what secrets are hidden under your dashboard. If you own a car built in the last 20 years, that’s where you’ll find the entry point to virtually everything that makes it tick. We’re talking about the OBD II port, which, if you have the right device, lets you diagnose mechanical problems, boost performance, and more. But what exactly is OBD II, and why is it so important to modern cars? We’ve got all of the answers right here." },
            { "id": "newsTxt1_3", "type": "txt", "url": "", "title": "What is OBD?", "content": "OBD stands for On-Board Diagnostic. It’s the standardized system that allows external electronics to interface with a car’s computer system. It has become more important as cars have become increasingly computerized, and software has become the key to fixing many problems and unlocking performance.OBD has existed in various forms long before anyone ever uttered the words “infotainment” or “connected car.” It came about primarily because of two factors: the need to regulate emissions, and the mass adoption of electronic fuel injection by automakers beginning in the 1980s.Unlike carburetors or previous mechanical fuel-injection systems, electronic fuel injection (EFI) requires computer control. Like its predecessors, EFI regulates fuel flow into the engine, but it does so using electronic signals rather than mechanical bits. That created the first major need to put computers in cars." },
            { "id": "newsTxt1_4", "type": "txt", "url": "", "title": "OBD vs. OBD II", "content": "Several automakers introduced computer interfaces for their own cars before the 1990s, but the push to standardize didn’t begin until 1991, when the California Air Resources Board (CARB) mandated that all cars sold in California needed some form of OBD capability. However, CARB didn’t issue standards for the systems until 1994. Known as OBD II, that standard was implemented for the 1996 model year, and is still in use today. Previous iterations of OBD were retroactively classified OBD I.Virtually every new car sold in the U.S. over the past 20 years follows the OBD II standard. OBD II cars have a port — usually located under the dashboard on the driver’s side — that devices can plug into and connect to a car’s computer. Companies have plenty of ideas about what you can plug into that port." },
            { "id": "newsTxt1_5", "type": "txt", "url": "", "title": "Delving into diagnostics", "content": "As the name implies, diagnostics are the primary purpose of OBD. When a car’s sensors decide that something is amiss, they trigger a message known as a “trouble code,” which may manifest as a “check engine” light or other warning on the dashboard. OBD scanners can check these trouble codes to determine exactly what’s wrong, and clear them from the computer’s memory once the problem is fixed.The trouble codes are just that, though: codes. Instead of a diagnosis like “loose gas cap,” you will see a string of letters and numbers that is incomprehensible without a reference. Trouble codes start with a letter and include four or five numbers, which together point to the specific subsystem and what problem it is experiencing.Some OBD scanners come preloaded with definitions for these codes, but otherwise you’ll need a list like the one that can be found on OBD-Codes.com. Note that in addition to the generic codes that apply to all cars, individual manufacturers have their own specific codes. Finding these can be a bit trickier, as not every manufacturer is entirely comfortable with the idea of releasing them to the public." },
            { "id": "newsTxt1_6", "type": "txt", "url": "", "title": "OBD for performance", "content": "Diagnostics may be the most important function of OBD equipment, but these tools can also be used to make your car go faster.Several aftermarket brands offer both OBD II data loggers and performance tuners that access critical vehicle systems through the dashboard port. Data loggers can be used to track more mundane things like fuel economy, but they can also record things like lap times and power output. Professional racers rely on this data to see how they perform on a track and to tweak their cars, so why shouldn’t you?Some companies also offer performance upgrades for specific vehicles that remap or alter software to unlock horsepower. Since modern vehicles are so dependent on computer controls, software changes can be as effective as bolting on a new air intake or exhaust system. It’s worth noting that these upgrades may have negative effects in other areas — such as reliability or fuel economy — and may void the factory warranty. Check before installing." },
            { "id": "newsTxt1_7", "type": "txt", "url": "", "title": "OBD Dongles", "content": "" },
            { "id": "newsTxt1_8", "type": "img", "url": _tcImg + "news/2.png", "title": "OBD Dongles", "content": "" },
            { "id": "newsTxt1_9", "type": "txt", "url": "", "title": "", "content": "Not everyone has the wherewithal to try to fix their own vehicle or upgrade their performance. Recently, companies have tried to exploit OBD II for more mainstream applications in the form of “dongles” — devices that plug directly into the OBD II port and connect wirelessly to a network.Dongles are sometimes issued to customers by insurance companies as a way to achieve discounts. This generally involves using data pulled from the car’s OBD II connection to analyze driving habits and award a discount for low-risk behavior. Allstate’s Drivewise program, for example, looks at speed, how quickly the driver brakes, the number of miles driven, and when a person drives.Other devices — such as Verizon’s Hum — enable telematics features, similar to what some automakers offer through subscription services. When paired with a smartphone app, Hum provides vehicle diagnostics, roadside assistance, stolen vehicle tracking, geofencing, and speed-alert features for parents looking to keep teen drivers on a short leash.When considering one of these devices, it’s important to remember that the physical separation between your car’s computer and a network that might contain malware is the first line of defense against hacking. Plugging anything into your car’s OBD II port compromises that barrier by giving an external device access to your car’s systems.In the case of telematics devices that send data across a wireless network, the network connection itself can be a second point of vulnerability. Just like any other connected device, there is no guarantee of invulnerability to security breaches." },
            // { "id": "newsTxt1_3", "type": "txt", "url": "", "title": "", "content": "" },
          ],
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "newsTxt2", "title": "OBD AND SCAN TOOLS", "dataTime": "31, MAR 2019",
          "url": _tcImg + "news/3.jpg",
          "dec": "With accurate data, a code tells you what the underlying problem is, what might be causing it or what parts are needed to fix the problem. It is a starting place and gives you some direction as to what might be wrong with the vehicle so our customers can decide what he or she wants to do next.",
          "detailList": [
            { "id": "newsTxt2_1", "type": "txt", "url": "", "title": "", "content": "When the “Check Engine” light comes on, many motorists don’t have a clue as to what to do next. They know the light means something is wrong, but is it a serious problem or a minor one? The only way to know for sure is to plug a scan tool or code reader into the vehicle’s diagnostic connector and see what comes out.One of the first auto parts stores to offer a free plug-in diagnostic service for motorists who wanted to find out what was causing their “Check Engine” light to come on was AutoZone. The program is popular with motorists because it saves the cost of having to take the vehicle to a new car dealer or repair facility to have it diagnosed. Being able to tell customers why their “Check Engine” light is on opens the door for potential parts sales, and it helps the motorist to decide whether or not the problem is something they want to tackle themselves. At the very least, knowing why the “Check Engine” light is on allows the customer to be better informed should they decide to take their vehicle to a professional for repairs.An Onboard Diagnostic II (OBD II) plug-in diagnosis is relatively simple to perform and requires only a code reader or basic scan tool. The tool is plugged into the diagnostic connector (which is usually located under the instrument panel near the steering column). To read the code(s) that are causing the “Check Engine” light to come on, you simply turn on the ignition, follow the prompts on the code reader or scan tool screen and read out the code(s).The least expensive code readers only display a number, so you have to look up the code definition in a handbook to find out what it means. The more expensive tools give you the number and a brief definition. The trouble is, a code doesn’t always tell you what the underlying problem is, what might be causing it or what parts are needed to fix the problem. But, it is a starting place and gives you some direction as to what might be wrong with the vehicle so your customer can decide what he or she wants to do next." },
            { "id": "newsTxt2_2", "type": "txt", "url": "", "title": "Scan Tool Differences", "content": "Whether you are choosing a scan tool for diagnosing customer’s vehicles, or are recommending a scan tool to a DIYer or a professional, there are major differences between the types of scan tool products available.There is a huge difference between a basic code reader and a full-fledged scan tool. A basic code reader that sells for less than $50 may be fine for reading “generic” diagnostic trouble codes, but it may not read “OEM” or “enhanced” codes that are vehicle specific.There are two types of OBD II diagnostic trouble codes: generic “P0” codes and enhanced “P1” codes. All vehicles use the same basic definitions for the generic codes, but the enhanced codes are vehicle-specific and may vary from one model year to the next. So it will likely be out of date by the next model year and have to be updated or replaced. What’s more, some types of faults will set a P1 code but not set a P0 code. That’s why you need a tool that can read both types of codes, not just the generic ones.The next step up in terms of capabilities are code readers that can also display the readiness status of the vehicle’s OBD II system monitors. These are self-checks that the OBD II system runs to make sure the vehicle is operating properly and is running clean. Some monitors run every time the engine is started and the vehicle is driven; however, others only run under certain operating conditions. One of these is the evaporative emissions system monitor (EVAP monitor) that checks for fuel vapor leaks. Many people call this the “loose gas cap monitor” because it may turn on the “Check Engine” light and set a P0440, P0442 or P0445 code if the gas cap is not fully tightened or is left off after refilling the tank. Another monitor that only runs occasionally is the catalyst monitor. This monitor checks the operating efficiency of the catalytic converter. If it senses a drop in efficiency, it will turn on the “Check Engine” light.Why do you need to know readiness status? If all the monitors have run and no faults have been found (no codes set and no “Check Engine” light), it means the vehicle is in emissions compliance, is running clean and should pass either a tailpipe smog check or an OBD II plug-in emissions test.Some people wonder why you can’t just clear the codes before taking an emissions test. Most code readers and scan tools can do just that. Pressing a button wipes the codes from the computer’s memory and turns off the “Check Engine” light. But as soon as the vehicle is driven, the code may reset and the “Check Engine” light may come back on depending on the nature of the problem. That’s where the readiness status comes in. A vehicle is not considered “ready” to take an OBD II plug-in emissions test unless all of the required monitors have run. The EVAP and catalyst monitor are the slowest ones to run, and may require driving the vehicle several days and at various speeds and loads before they will run their self-checks. So until that happens, the vehicle can’t be tested." },
            { "id": "newsTxt2_3", "type": "txt", "url": "", "title": "‘DIY’ Vs ‘PRO’ Scan Tools", "content": "A code reader can provide an inexpensive means of reading and clearing codes, and maybe even checking the status of the OBD II monitors, but that’s all. To read sensor data, history codes, pending codes, etc., you need a “real” scan tool, and the price jumps accordingly. An entry level scan tool with these features starts around $200 and goes up from there.Most DIY scan tools do not have bidirectional communications capability. This is done for liability reasons. Most late-model vehicles have quite a few built-in self-checks that can be performed with a dealer or professional level scan tool, but running these tests requires some know-how, experience and caution. For many situations, the advanced capabilities are not necessary, but when it is needed, there’s no substitute for having a professional-grade scan tool. Pro tools typically start in the $1,500 to $2,000 range, and go up depending on the tool’s capabilities and features.One change that is affecting the type of scan tool required to diagnose late-model vehicles is the introduction of Controller Area Network (CAN) computer systems. CAN engine control systems are much faster and smarter than previous generations of engine control systems. CAN is a high-speed data link that runs 50 times faster than the four existing OBD II communication protocols. The CAN protocol allows multiple control modules to share information, and requires special hardware and software for diagnostics. Consequently, you need a scan tool that is CAN-compliant for some 2003 vehicles, and many 2004-and-newer cars and trucks. Most older scan tools that were manufactured before CAN came along do not have the hardware capabilities to read the faster data and cannot be upgraded." },
            { "id": "newsTxt2_4", "type": "txt", "url": "", "title": "Understanding Codes", "content": "Regardless of what type of code reader or scan tool is used to read codes, an important point to remember is that a code by itself is not a diagnosis. It is a starting point for further testing and diagnosis. The code may tell you the nature of the problem or the circuit that is acting up, but it doesn’t tell you what’s causing it. This is why you can’t necessarily sell a part based on the code that was pulled from a vehicle.The “enable criteria” that sets a code will vary from one vehicle to another, so there are no rules of thumb to guide your diagnosis. You usually need the OEM service information, diagnostic charts, and test specifications to isolate the fault. You also need additional test equipment such as a digital multimeter (possibly a graphing multimeter), digital storage oscilloscope and/or five-gas emissions analyzer to accurately diagnose some driveability and emissions problems — plus a thorough understanding of engine control systems, sensors and onboard diagnostics. In other words, the motorist really should take his or her vehicle to a professional shop.Some higher-end scan tools not only display codes and data, but can also graph sensor waveforms. The ability to graph data makes it easier to see what is actually going on and to compare data." },
            { "id": "newsTxt2_5", "type": "txt", "url": "", "title": "Scan Tool Trends", "content": "In recent years, more and more new diagnostic tools have been introduced from companies such Actron (OTC), Auterra, Autologic, AutoXray (OTC), Baum Tools, Delphi and others. Their products range from entry level code readers to professional grade scan tools that combine scan tool, graphing and emissions functions all in one. Competition is driving down prices and forcing scan tool suppliers to include more features at little or no extra cost. This includes larger displays, color graphics, broader vehicle make and model applications (though European coverage is still limited in most tools to generic OBD II compliant only) and more parameter identification data. This is good news because it means scan tool users get more for their money.Menus have also improved, making the tools much easier to use. Larger screens and color graphics also make it easier to see the data even in bright sunlight. Good visibility reduces the risk of misreading information and is a plus for aging boomers whose eyes may not be as sharp as they were 20 years ago.Another trend we’re seeing is the narrowing gap between OEM dealer scan tools and aftermarket scan tools. A gap still exists and some aftermarket versions of the OEM scan tool have been “decontented”, but other aftermarket scan tools now offer most if not all of the diagnostic capabilities of the factory scan tool.Most professional technicians say the factory OEM scan tools are the best, but can’t afford to own a different scan tool for each and every make of vehicle they work on. So they may have one or two OEM scan tools for the more common makes they service, and an aftermarket “all makes and models” scan tool for the rest.Finally, there is the issue of tool obsolescence. Most scan tools are upgradeable with a plug-in cartridge, memory card or with software downloads. The tool manufacturer may offer free upgrades for a certain period of time, or they may charge an arm and a leg for annual updates. These are important things that need to be considered before a tool is purchased." },
          ],
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "newsTxt3", "title": "GLOBAL OBD AFTERMARKET INDUSTRY TO SURPASS $1.5BN BY 2024", "dataTime": "31, MAR 2019",
          "url": _tcImg + "news/4.png",
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
          "isRep": false, "author": "", "repUrl": "",
        },
        {
          "id": "newsTxt4", "title": "MARSHARK LAUNCHES THINKCAR OBD, WORLD'S SMALLEST AND MOST POWERFUL DIAGNOSTIC TOOL", "dataTime": "19, Jul 2019",
          "url": _tcImg + "news/5.jpg",
          "dec": "Marshark proudly launches THINKCAR OBD, world’s smallest and most powerful diagnostic tool, it empowers you to transform your phone into a professional-grade diagnostic tool. The THINKCAR OBD II Scan Tool connects to your mobile device via Bluetooth, easily transferring the fault codes and data from your vehicle’s on board computer.",
          "detailList": [
            { "id": "newsTxt4_1", "type": "img", "url": _tcImg + "news/5_1.jpg", "title": "", "content": "" },
            { "id": "newsTxt4_2", "type": "txt", "url": "", "title": "THINKCAR’s 1/1S OBD Scan Tool", "content": "Marshark proudly launches THINKCAR OBD, world’s smallest and most powerful diagnostic tool, it empowers you to transform your phone into a professional-grade diagnostic tool. The THINKCAR OBD II Scan Tool connects to your mobile device via Bluetooth, easily transferring the fault codes and data from your vehicle’s on board computer." },
            { "id": "newsTxt4_3", "type": "txt", "url": "", "title": "", "content": "Using your phone as your personal 24/7 mechanic makes car maintenance easy. With THINKCAR’s mobile app, anyone can diagnose and identify the root of their vehicle’s problems, regardless of technical knowledge or experience. By better understanding your car, you can decide whether it needs full servicing or just a touch of DIY repair, potentially saving heaps of money from unnecessary trips to the mechanic." },
            { "id": "newsTxt4_4", "type": "txt", "url": "", "title": "", "content": "The THINKCAR 1 and 1S will be launching on Kickstarter as of July 29th. Check out the pre-launch page here and sign up for the email list for exclusive discounts on the product, up to 50% off!" },
            { "id": "newsTxt4_5", "type": "img", "url": _tcImg + "news/5_2.jpg", "title": "", "content": "" },
            { "id": "newsTxt4_6", "type": "txt", "url": "", "title": "How It’s Different", "content": "" },
            { "id": "newsTxt4_7", "type": "txt", "url": "", "title": "Full Vehicle Diagnostics:", "content": "Why does THINKCAR differ from other products? Conventional OBD tools can only scan four major parts of a car, whereas THINKCAR will provide a fully comprehensive test, assessing additional systems of your vehicle such as its ABS, gearbox, and engine. This allows you to enjoy full control over your car’s systems." },
            { "id": "newsTxt4_8", "type": "txt", "url": "", "title": "Remote Diagnostics:", "content": "On top of this tool’s excellent intuition, mechanics using THINKCAR’s app can access your vehicle’s data from anywhere, regardless of distance. Even if you struggle to understand your OBD data, rest assured that anyone with the THINKCAR app can connect to your car and help resolve any concerns." },
            { "id": "newsTxt4_9", "type": "txt", "url": "", "title": "Black Box", "content": "Inspired by aviation, the THINKCAR scan tool features a blackbox function. OBD data from your vehicle is recorded and stored in real time allowing you to access historical data through the app. If you are ever involved in a crash or motor accident, the THINKCAR 1 or 1S functions as a standalone Event Data Recorder. Saved data can be reviewed by technicians to analyze the root cause of the vehicles issues." },
            { "id": "newsTxt4_10", "type": "txt", "url": "", "title": "Cost:", "content": "By subscribing to our promotional email here, you’ll enjoy up to 70% off purchase of THINKCAR Scan Tool. The product will be launched on Kickstarter on July 29th." },
          ],
          "isRep": false, "author": "", "repUrl": "",
        },

        // { "id": "newsTxt1", "title": "", "dataTime": "", "url": "" ,"dec": ""},
      ],
    }

    this.initFun = this.initFun.bind(this)//购买
    this.onClickNewsTxtDetail = this.onClickNewsTxtDetail.bind(this)//新闻详情

  }
  componentDidMount () {
    // this.initFun(this.props)
  }

  initFun (props) {

  }

  onClickNewsTxtDetail (_type, _id) {
    if (_type == 'newTxt') {
      this.props.history.push('/newsDetail/' + _type + '/' + _id)
    }

  }
  render () {
    let { isFetching, _newsPageTxtList } = this.state;
    let { InitData } = this.props;
    const gutter = 24;

    return (
      <div className="tc-news-page">
        <Row className=" think-car-home-price-img" style={{ padding: '0 10%', background: '#fff' }}>
          <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._newsPageImg} />
        </Row>
        <Row className="tc-news-list" >
          <Row gutter={[gutter]}>
            {
              InitData._newsPageList.length && InitData._newsPageList.map((_i, _x) => {

                return <Col className="tc-mobile-col-widthmax" span={8} style={{ marginBottom: '2%' }} key={"tc_news_list_" + _i.id} >
                  <Card
                    hoverable
                    cover={
                      <iframe
                        className="tc-mobile-news-iframe"
                        src={_i.url}
                        width="100%"
                        style={{ minHeight: '400px' }}
                        frameBorder="0"
                        allowFullScreen
                      >
                      </iframe>
                      // <ReactPlayer width='100%' url={_i.url} />
                    }
                  >
                    <Meta title={_i.title} description={[
                      <Icon key={'tc-new-list-mate-keyvideo1-' + _x} type="user" />,
                      <span key={'tc-new-list-mate-keyvideo2-' + _x}>{"  " + _i.author}</span>]} />
                  </Card>
                </Col>
              })
            }
          </Row>
          <Row gutter={[gutter]}>
            {
              _newsPageTxtList.length && _newsPageTxtList.map((_i, _x) => {

                return <Col className="tc-mobile-col-widthmax" span={8} style={{ marginBottom: '2%' }} key={"tc_news_list_txt_" + _i.id + _x} >
                  <Card
                    hoverable
                    cover={
                      <img alt={_i.title} className='think-car-home-img' src={InitData._homeImgPath + _i.url} />
                    }
                  >
                    <Meta title={_i.title} description={[
                      <span key={'tc-new-list-mate-key1-' + _x}>{_i.dataTime} </span>,
                      <p key={'tc-new-list-mate-key2-' + _x} className=" tc-news-list-txt-doc">
                        {_i.dec}
                      </p>,
                      <Button key={'tc-new-list-mate-key3-' + _x} className="tc-news-btn-read" onClick={() => { this.onClickNewsTxtDetail('newTxt', _i.id) }}><FormattedMessage id="tc2" /></Button>
                    ]}
                    />
                  </Card>
                </Col>
              })
            }
          </Row>
        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(NewsPage)
