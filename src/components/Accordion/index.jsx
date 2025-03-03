import React from 'react'
import { useState } from 'react'
import Div from '../Div'

export default function Accordion() {
  const [selected, setSelected] = useState(0)
  const handelToggle = (index) => {
    if(selected === index) {
      return setSelected(null)
    }
    setSelected(index)
  }
  const accordionData = [
     {
      question: 'What is the purpose of the web application?',
      answer: 'The web application is designed to provide students with a platform to streamline the assignment completion process. The ultimate goal of theproject.ai is to help students achieve better academic outcomes by providing them with a streamlined and supportive environment for completing their assignments.'
    },
    {
      question: 'How does the application help students with their assignments?',
      answer: 'The application helps students with their assignments by using the information provided by the student to gather relevant information and resources through the OpenAI API. This information is then organized and presented to the student in a clear and concise format, such as a PDF report.'
    },
    {
      question: 'What type of assignments does the application support?',
      answer: 'The application has been designed to support a wide range of assignments, such as research papers, essays, lab reports and more. The important aspect is that the information and resources gathered through the OpenAI API are relevant and applicable to the type of assignment the student is completing.'
    },
    {
      question: 'Is the information provided by the system plagiarism-free?',
      answer: 'While the information provided by the system may not be plagiarized, it is important to note that the responsibility for ensuring the originality of the work produced still lies with the student. The application is designed to assist the student in the research and information gathering process, but the student is ultimately responsible for using this information in an ethical and appropriate manner, including proper citation and avoiding plagiarism. It is recommended that students review the information and resources provided by the system and verify its accuracy and originality before including it in their assignments.'
    },
    {
      question: 'Is the application free to use?',
      answer: 'The cost of the service is based on the type of project, the required extension and the costs associated with the consumption of the OpenAI API, which means that it is not a free application in itself.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'To contact customer support, the user can use the following methods: Call Center: The user can call the call center and speak with a representative for immediate assistance. Email Support: The user can also send an email to the email support address provided, which is "support@theproject.ai". In the email, the user can describe their issue or question and the customer support team will respond as soon as possible. It is recommended that the user consult the website of the application for any additional information on how to contact customer support and the hours of availability.'
    },
  ]
  return (
    <Div className="cs-accordians cs-style1">
      {accordionData.map((item, index)=>(
        <Div className={`cs-accordian ${selected===index?'active':''}`} key={index}>
          <Div className="cs-accordian_head" onClick={()=>handelToggle(index)}>
            <h2 className="cs-accordian_title">{item.question}</h2>
            <span className="cs-accordian_toggle cs-accent_color">
              <svg width={15} height={8} viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L7.5 7.5L15 0H0Z" fill="currentColor" />
              </svg>                    
            </span>
          </Div>
          <Div className='cs-accordian_body'>
            <Div className="cs-accordian_body_in">{item.answer}</Div>
            </Div>
        </Div>
      ))}
    </Div>
  )
}
