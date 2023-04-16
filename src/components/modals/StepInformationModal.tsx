import {t, Trans} from "@lingui/macro"
import {useEffect, useState} from "react"
import {Modal} from "react-bootstrap"
import {StepNumber} from "../pages/assessment/stages/discuss/DiscussStage"

const BodyContent = ({activeStep}: {activeStep?: number}) => {
  switch (activeStep) {
    case 1: {
      return (
        <>
          <StepNumber step={1} />
          <p>
            <Trans>
              The aim of step 1 is for both the patient and the clinician to gain a shared understanding of the
              patient’s current situation. There are two parts to understanding:
            </Trans>
          </p>
          <h3>
            (i) <Trans>Exploring</Trans>
          </h3>
          <p>
            <Trans>
              First, the clinician should explore the patient’s evaluation of the domain, and the reasons why they have
              requested more help for that domain, or given it a low rating. In the case of special attention to mental
              health, the clinician should explore the patient’s expression of distress or concern.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>
          <p className="text-muted">
            <em>
              <Trans>“You asked for more help with physical health. What is lacking in that area?”</Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>“What in particular makes you dissatisfied with your medication?”</Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “You rated your satisfaction with accommodation as 3 out of 7, mainly dissatisfied. Why is that?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>“Can you tell me more about the distressing voices you’ve been hearing?”</Trans>
            </em>
          </p>
          <h3>
            (ii) <Trans>Identifying what works</Trans>
          </h3>
          <p>
            <Trans>
              Next, the clinician should now ask the patient to identify what is working well within the current
              situation. The assumption is that, no matter how bad things may be, the patient somehow manages to cope.
              Building an awareness of the strengths within the situation is intended to help promote the patient’s
              confidence and motivation for change.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>
          <p className="text-muted">
            <em>
              <Trans>
                “Although you are mainly dissatisfied with your physical health, at least you are not at the bottom end
                of the scale. What is helping to keep you from being totally dissatisfied?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “It’s encouraging that your satisfaction with your accommodation is 2 rather than 1. So what is working
                well with your accommodation?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “Your satisfaction with your relationship is 3. What makes your situation better than a 2 or a 1?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “When you feel totally dissatisfied with your mental health, what helps you to cope? Are there moments
                when you feel less distressed?”
              </Trans>
            </em>
          </p>
        </>
      )
    }
    case 2: {
      return (
        <>
          <StepNumber step={2} />
          <p>
            <Trans>
              Having explored both negative and positive aspects of the situation in Step 1, the aim of step 2 is to now
              focus on the future and establish the patient’s desired changes to their situation. The intention is to
              encourage the patient to think about and describe what an improvement in their situation would look like,
              and what changes would be a sign of progress. The clinician should seek to elicit a clear picture of the
              future from the patient that is:
            </Trans>
          </p>
          <ul>
            <li>
              <Trans>detailed</Trans>
            </li>
            <li>
              <Trans>
                characterised by tangible behaviours rather than vague feelings (e.g. “I would talk more to my
                neighbours” rather than “I would feel more included in my community”)
              </Trans>
            </li>
            <li>
              <Trans>
                defined by the presence rather than the absence of something (e.g. “I would have the energy to get a
                part-time job” rather than “I would not feel as tired all the time”).
              </Trans>
            </li>
          </ul>
          <h3>
            (i) <Trans>What is the patient’s ‘best-case scenario’?</Trans>
          </h3>
          <p>
            <Trans>
              First, the clinician should ask the patient to describe the ideal outcome they would like to achieve;
              essentially, what would be different if the patient scored 7 out of 7 (totally satisfied). The best-case
              scenario is often, but not always, a long-term outcome.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>
          <p className="text-muted">
            <em>
              <Trans>
                “You’re unhappy with your employment situation: What would be the best possible employment situation for
                you?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “If your satisfaction with physical health was 7 (totally satisfied), what exactly would be different?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “If tomorrow morning you woke up and all your problems with your family had gone, how would the
                situation be?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>“What would rating 7 out of 7 for medication mean to you?”</Trans>
            </em>
          </p>
          <h3>
            (ii) <Trans>What small changes would make a difference?</Trans>
          </h3>
          <p>
            <Trans>
              Next, the clinician should ask to patient to describe smaller changes that would make a meaningful
              difference to their life. It may be that the best-case scenario previously described cannot occur
              instantly, or at all. Here, the patient is asked to consider what small change would mean an improvement
              of just one point higher on the scale, and help in the long-term process of achieving the best-case
              scenario, where possible.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>
          <p className="text-muted">
            <em>
              <Trans>
                “Until you are rehoused in the coming months, what small improvement to your accommodation would make it
                more acceptable to you?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “You rate your friendships as 3 – what would need to be different for you to reach 4 - just one point
                higher on the scale?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “What is the smallest noticeable change that you would see as a sign of improved mental health?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “It can take time to adapt to new medication, especially when you are experiencing side effects. What
                would be the first sign that you were adjusting to it?”
              </Trans>
            </em>
          </p>
        </>
      )
    }
    case 3: {
      return (
        <>
          <StepNumber step={3} />
          <p>
            <Trans>
              Having introduced a forward-looking perspective in Step 2, the aim of Step 3 is for the patient and the
              clinician to explore a number of options that may help to bring about the desired changes. These options
              involve things that patient can do by themselves, things the clinician can do with the help of the various
              services available to the patient, and things other people in the patient’s life can do.In Step 3 the
              clinician asks the patient what are all the options he/she can think of as potentially helpful. The
              clinician can also propose different options, and ask for the patient’s opinion about them. Step 3 is
              concerned with what is possible to do at the present time in order to achieve the patient’s desired
              changes.
            </Trans>
          </p>
          <h2>
            <Trans>In step 3, three kinds of questions can be asked:</Trans>
          </h2>
          <h3>
            (i) <Trans>‘What can the patient do?’</Trans>
          </h3>
          <p>
            <Trans>
              First, the clinician should invite the patient to think for themselves of all the possible things they
              might be able to do to help their own situation.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>

          <p className="text-muted">
            <em>
              <Trans>
                “We’ve talked about what needs to change in order for you to feel safe. What is the first thing you can
                do to ensure your own safety?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>“What are some of the ways you could start to reach out to others in the community?”</Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “The next time you hear voices, what can you try to prevent yourself from feeling so distressed?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>“What could you do to make sure you remember to take your medication in the morning?”</Trans>
            </em>
          </p>

          <h3>
            (ii) <Trans>‘What the clinician can do’</Trans>
          </h3>
          <p>
            <Trans>
              Next, the clinician should ask what he/she can do to support the patient, and what resources or services
              he/she can provide. It may be appropriate to suggest specific resources that are available to the patient
              that might help in improving the situation.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>

          <p className="text-muted">
            <em>
              <Trans>
                “Is there anything I can do to help to make you less anxious about leaving the house to attend your
                meetings?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>“What kind of support from our team do you need to help you in finding a job?”</Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “I wonder whether a leaflet describing pros and cons of taking medication would be something you may
                find helpful?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “There is a Hearing Voices group running here. Might that be something you would like to try?”
              </Trans>
            </em>
          </p>

          <h3>
            (iii) <Trans>‘What other people can do’</Trans>
          </h3>
          <p>
            <Trans>
              Finally, the clinician should ask what other people can do to help the patient improve their situation.
              This might be a friend, family member, relative, neighbour, colleague, befriender, support worker, fellow
              patient or another supporter.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>

          <p className="text-muted">
            <em>
              <Trans>“Is there anyone else who could get involved in helping you to exercise more?”</Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>“Can you think of anybody that could help you to get to your class on time?”</Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “Is there a neighbour or friend who could help you bring your shopping to the top floor with you?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>“What could your partner do to stop you two from arguing so often?”</Trans>
            </em>
          </p>
        </>
      )
    }
    case 4: {
      return (
        <>
          <StepNumber step={4} />
          <p>
            <Trans>
              Through Steps 1 – 3, both the patient and the clinician have developed a thorough understanding of the
              patient’s current situation, thought about desired changes for the future, and identified options for
              moving forward. The goal of Step 4 is to reach an agreement on what action(s) should be taken, and by
              whom.
            </Trans>
          </p>
          <p>
            <Trans>
              Sometimes, having considered the various options in Step 3, the patient will have a clear idea of what
              action should be taken and it is appropriate to invite the patient to take the lead with any decision.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>

          <p className="text-muted">
            <em>
              <Trans>“We‘ve talked about a lot of different options today. Which ones will we go for?”</Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “Of all the options we’ve discussed, are there some in particular that you are leaning towards?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “Let’s decide on the best way forward. Which options shall we try out, before we meet again?”
              </Trans>
            </em>
          </p>

          <p>
            <Trans>
              Sometimes, the clinician may take the lead in suggesting one or more actions and explore whether the
              patient agrees.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>

          <p className="text-muted">
            <em>
              <Trans>
                “I think a visit to the Day Centre we talked about would be a good start to feeling less isolated. Can
                we agree that you will try that this month and we’ll see how you got on next time?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “Regarding your job situation, I suggest that you ask your partner to help you type up your C.V. and
                I’ll make an appointment on your behalf with the Back-to-Employment Officer. Is this alright with you?”
              </Trans>
            </em>
          </p>

          <p>
            <Trans>
              Sometimes, the patient and clinician may not agree on an immediate ‘action’; instead, the patient might
              decide to spend more time thinking aboutthe different options discussed between now and the next meeting.
            </Trans>
          </p>
          <h4>
            <Trans>Examples:</Trans>
          </h4>

          <p className="text-muted">
            <em>
              <Trans>
                “If you cannot decide today about whether you’re ready to come off medication. Do you want to think
                about it and let me know when you have come to a decision?”
              </Trans>
            </em>
          </p>
          <p className="text-muted">
            <em>
              <Trans>
                “If you feel uncomfortable, there is no need to decide today whether you want to go back to regular
                employment. Can we agree that you think about it and we revisit the issue next time?”
              </Trans>
            </em>
          </p>
          <p>
            <Trans>
              Once an action item has been decided, the clinician should document it in the text box provided.
              Documentation should be brief, but precise. A reminder of the agreed action(s) will appear at the start of
              the next session, so that patient and clinician can review the progress since the last session before
              initiating a new session.
            </Trans>
          </p>
        </>
      )
    }
    default:
      return <></>
  }
}

export const StepInformationModal = ({activeStep, onClose}: {activeStep?: number; onClose: () => void}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleClose = () => {
    setShowModal(false)
    onClose?.()
  }
  const [modalTitle, setModalTitle] = useState<string>("")

  useEffect(() => {
    switch (activeStep) {
      case 1: {
        setModalTitle(t`Understanding`)
        setShowModal(true)
        break
      }
      case 2: {
        setModalTitle(t`Looking forward`)
        setShowModal(true)
        break
      }
      case 3: {
        setModalTitle(t`Exploring options`)
        setShowModal(true)
        break
      }
      case 4: {
        setModalTitle(t`Agreeing on actions`)
        setShowModal(true)
        break
      }
      default:
        setShowModal(false)
    }
  }, [activeStep])

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <h4 className="m-0">{modalTitle}</h4>
      </Modal.Header>
      <Modal.Body>
        <BodyContent activeStep={activeStep} />
      </Modal.Body>
    </Modal>
  )
}
