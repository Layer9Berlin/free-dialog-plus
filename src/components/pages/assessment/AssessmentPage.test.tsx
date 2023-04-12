import {i18n} from "@lingui/core"
import {screen} from "@testing-library/react"
import {de, en} from "make-plural/plurals"
import {act} from "react-dom/test-utils"
import {messages as deMessages} from "../../../locales/de/messages"
import {messages as enMessages} from "../../../locales/en/messages"
import {dummyAssessment} from "../../../test/data/dummyAssessment"
import {renderForTest} from "../../../test/helpers"
import {InMemoryDataStore} from "../../api/InMemoryDataStore"
import {AssessmentPage} from "./AssessmentPage"

// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true

i18n.loadLocaleData({
  en: {plurals: en},
  de: {plurals: de},
})
i18n.load({
  en: enMessages,
  de: deMessages,
})
i18n.activate("en")

describe("Assessment 404 page", () => {
  test("Should show assess stage", async () => {
    await act(renderForTest(<AssessmentPage />, {url: "/assessment?id=invalidAssessment&stage=assess"}))
    expect((await screen.findByRole("heading")).textContent).toBe("Assess")
    expect(await screen.findByText("Assessment not found")).toBeInTheDocument()
  })

  test("Should show review stage", async () => {
    await act(renderForTest(<AssessmentPage />, {url: "/assessment?id=invalidAssessment&stage=review"}))
    expect((await screen.findByRole("heading")).textContent).toBe("Review")
    expect(await screen.findByText("Assessment not found")).toBeInTheDocument()
  })

  test("Should show select stage", async () => {
    await act(renderForTest(<AssessmentPage />, {url: "/assessment?id=invalidAssessment&stage=select"}))
    expect((await screen.findByRole("heading")).textContent).toBe("Select")
    expect(await screen.findByText("Assessment not found")).toBeInTheDocument()
  })

  test("Should reroute to discuss stage", async () => {
    await act(renderForTest(<AssessmentPage />, {url: "/assessment?id=invalidAssessment&stage=discuss"}))
    expect((await screen.findByRole("heading")).textContent).toBe("Select")
    expect(await screen.findByText("Assessment not found")).toBeInTheDocument()
  })

  test("Should reroute to action items stage", async () => {
    await act(renderForTest(<AssessmentPage />, {url: "/assessment?id=invalidAssessment&stage=action-items"}))
    expect((await screen.findByRole("heading")).textContent).toBe("Select")
    expect(await screen.findByText("Assessment not found")).toBeInTheDocument()
  })

  test("Should handle unknown stage", async () => {
    await act(renderForTest(<AssessmentPage />, {url: "/assessment?id=invalidAssessment&stage=unknown"}))
    expect((await screen.findByRole("heading")).textContent).toBe("Assess")
    expect(await screen.findByText("Assessment not found")).toBeInTheDocument()
  })
})

const dataStoreWithAssessment = () =>
  new InMemoryDataStore([
    dummyAssessment({
      id: "assessment1",
      questions: [
        {
          text: {
            short: "Test short question",
            long: "Test long question",
            export: "Test export question",
          },
          state: {
            collapsed: false,
            selected: true,
          },
          value: {
            selectedOption: 3,
            furtherHelp: true,
            actionItems: ["Test 1", "Test 2"],
          },
          id: "testId",
        },
      ],
    }),
  ])

describe("Assessment page", () => {
  test("Should show assess stage", async () => {
    console.log(await dataStoreWithAssessment().assessments.list())
    await act(
      renderForTest(<AssessmentPage />, {
        dataStore: dataStoreWithAssessment(),
        url: "/assessment?id=assessment1&stage=assess",
      }),
    )
    expect((await screen.findByRole("heading")).textContent).toBe("Assess")
    expect(await screen.findByText("Assessment not found")).toBeInTheDocument()
    expect(await screen.findByText("Test long question")).toBeInTheDocument()
    expect(await screen.findByText("Yes")).toBeChecked()
    expect(await screen.findByText("No")).not.toBeChecked()
  })
})
