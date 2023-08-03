import { NewGameLink } from '@/components/Buttons';
import { randomUUID } from 'crypto';
import Link from 'next/link';

export default function LandingPage() {
  const newGameId = randomUUID();
  return (
    <main className="p-5">
      <h2 className="text-3xl font-bold mt-5 mb-5">
        Welcome to planning poker.
      </h2>
      <p>
        Use a link from your friend or a colleague to join, or{' '}
        <NewGameLink className="underline hover:text-red-800 dark:hover:text-red-200">
          create a new room.
        </NewGameLink>
      </p>
      <div className="flex flex-col gap-5 py-3 px-8 border-solid rounded-lg border-2 mt-5 mb-10">
        <h3 className="text-xl font-bold">What is planning poker?</h3>
        <p>
          Planning Poker is a collaborative technique used by agile teams to
          estimate the effort or complexity of user stories or tasks. It allows
          team members to contribute their individual insights and knowledge to
          arrive at a shared understanding of the work involved.
        </p>
        <h3 className="text-xl font-bold">How does Planning Poker work?</h3>
        <ol className="list-decimal">
          <li>
            <p>
              Gather your team: Bring together the individuals involved in the
              estimation process. The people participating in the estimation
              should only be the ones that are actually implementing the
              features, so no product owners or such.
            </p>
          </li>
          <li>
            <p>
              Select an user story or task: Choose a specific item from your
              project backlog that needs to be estimated. Break it down into
              manageable chunks if necessary.
            </p>
          </li>
          <li>
            <p>
              Assign story points: Story points are a relative unit of
              measurement used in Planning Poker to represent the effort,
              complexity, or size of a user story or task. Each participant will
              assign a story point value to the selected item independently and
              privately. Story points cannot be linked to working days or hours,
              but are instead an estimation that can be used to compare to other
              tasks that have been estimated in the same way.
            </p>
          </li>
          <li>
            <p>
              Show the cards: Everyone reveals their assigned card
              simultaneously, so others won&apos;t be able to affect the choices
              of other individuals.
            </p>
          </li>
          <li>
            <p>
              Discuss and clarify: If there is a wide range of estimates,
              encourage team members to discuss their reasoning and share their
              perspectives. This fosters communication and allows for a better
              understanding of the task.
            </p>
          </li>
          <li>
            <p>
              Choose an estimate: After discussion choose together an estimate
              that everyone can agree with, if estimates are really close to
              each other, it might not need discussion and the average can be
              chosen, but if some estimate is clearly smaller or larger, then
              discussion is needed.
            </p>
          </li>
        </ol>
        <h3 className="text-xl font-bold">
          How does Planning Poker help teams:
        </h3>
        <ol className="list-decimal">
          <li>
            <p>
              Foster collaboration: By involving all team members in the
              estimation process, Planning Poker encourages collaboration and
              ensures that everyone&apos;s input is considered.
            </p>
          </li>
          <li>
            <p>
              Promote transparency: The open discussion during Planning Poker
              promotes transparency within the team. It allows for a deeper
              understanding of the work involved and any potential challenges.
            </p>
          </li>
          <li>
            <p>
              Improve estimation accuracy: The collective wisdom and diverse
              perspectives of the team result in more accurate estimations.
              Planning Poker helps eliminate biases and minimizes the risk of
              underestimating or overestimating tasks.
            </p>
          </li>
          <li>
            <p>
              Enhance team communication: Planning Poker facilitates
              communication and knowledge sharing among team members. It
              encourages active participation and provides a platform for
              individuals to express their thoughts and concerns.
            </p>
          </li>
        </ol>
        <p>
          Remember, the goal of Planning Poker is not to find the
          &quot;right&quot; answer, but to leverage the collective intelligence
          of the team to arrive at a consensus estimate. It is a valuable tool
          for agile teams to plan and prioritize their work effectively.
        </p>
        <p>
          Start estimating with Planning Poker today and experience the benefits
          of collaborative estimation in your projects. Happy planning!
        </p>
      </div>
    </main>
  );
}
