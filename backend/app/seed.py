from app.database import SessionLocal

from app.models import Board, Task, TaskPriority, TaskStatus

seed_boards = [
    {
        "id": "seed-board-1",
        "title": "Website Redesign",
        "description": "Refresh the company website with updated content, navigation, and visual design.",
        "icon": "Globe",
    },
    {
        "id": "seed-board-2",
        "title": "Mobile App Launch",
        "description": "Prepare the new mobile app for beta testing and public release.",
        "icon": "Rocket",
    },
    {
        "id": "seed-board-3",
        "title": "Q4 Marketing Campaign",
        "description": "Plan and deliver the Q4 acquisition campaign across web, email, and social.",
        "icon": "Megaphone",
    },
    {
        "id": "seed-board-4",
        "title": "Customer Portal",
        "description": "Improve the customer experience for billing, support, and account management.",
        "icon": "UserRound",
    },
]

seed_tasks = [
    #  Website Redesign — seed-board-1
    {
        "id": "seed-1",
        "title": "Finalize homepage wireframes",
        "description": "Review and finalize the homepage layout before development begins.",
        "status": TaskStatus.DONE,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-03",
        "tags": ["design", "homepage"],
        "board_id": "seed-board-1",
    },
    {
        "id": "seed-2",
        "title": "Update primary navigation",
        "description": "Implement the updated navigation structure and menu interactions.",
        "status": TaskStatus.DONE,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-07",
        "tags": ["frontend", "ux"],
        "board_id": "seed-board-1",
    },
    {
        "id": "seed-3",
        "title": "Build responsive hero section",
        "description": "Implement the new homepage hero layout across supported screen sizes.",
        "status": TaskStatus.IN_PROGRESS,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-19",
        "tags": ["frontend", "responsive"],
        "board_id": "seed-board-1",
    },
    {
        "id": "seed-4",
        "title": "Migrate About page content",
        "description": "Move approved About page copy and media into the redesigned site.",
        "status": TaskStatus.IN_PROGRESS,
        "priority": TaskPriority.LOW,
        "due_date": "2026-09-22",
        "tags": ["content"],
        "board_id": "seed-board-1",
    },
    {
        "id": "seed-5",
        "title": "Review accessibility issues",
        "description": "Audit redesigned pages for keyboard, contrast, and screen reader issues.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-25",
        "tags": ["accessibility", "qa"],
        "board_id": "seed-board-1",
    },
    {
        "id": "seed-6",
        "title": "Optimize homepage images",
        "description": "Reduce image payload sizes and verify appropriate formats are being served.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-27",
        "tags": ["performance", "assets"],
        "board_id": "seed-board-1",
    },
    {
        "id": "seed-7",
        "title": "Complete cross-browser QA",
        "description": "Verify the redesigned website in all supported desktop and mobile browsers.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-30",
        "tags": ["qa", "frontend"],
        "board_id": "seed-board-1",
    },
    #  Mobile App Launch — seed-board-2
    {
        "id": "seed-8",
        "title": "Complete onboarding flow",
        "description": "Finalize the first-time user onboarding experience for the mobile app.",
        "status": TaskStatus.DONE,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-02",
        "tags": ["product", "onboarding"],
        "board_id": "seed-board-2",
    },
    {
        "id": "seed-9",
        "title": "Add analytics events",
        "description": "Track key onboarding, navigation, and conversion events.",
        "status": TaskStatus.DONE,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-08",
        "tags": ["analytics", "engineering"],
        "board_id": "seed-board-2",
    },
    {
        "id": "seed-10",
        "title": "Fix notification settings bug",
        "description": "Resolve the issue preventing notification preferences from saving correctly.",
        "status": TaskStatus.IN_PROGRESS,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-19",
        "tags": ["bug", "engineering"],
        "board_id": "seed-board-2",
    },
    {
        "id": "seed-11",
        "title": "Run beta usability sessions",
        "description": "Conduct usability sessions with beta users and document recurring feedback.",
        "status": TaskStatus.IN_PROGRESS,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-23",
        "tags": ["research", "beta"],
        "board_id": "seed-board-2",
    },
    {
        "id": "seed-12",
        "title": "Prepare App Store screenshots",
        "description": "Create final screenshots showcasing the primary app workflows.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-25",
        "tags": ["design", "launch"],
        "board_id": "seed-board-2",
    },
    {
        "id": "seed-13",
        "title": "Write release notes",
        "description": "Draft customer-facing release notes for the initial app launch.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.LOW,
        "due_date": "2026-09-28",
        "tags": ["content", "launch"],
        "board_id": "seed-board-2",
    },
    {
        "id": "seed-14",
        "title": "Complete release candidate QA",
        "description": "Run the final regression checklist against the release candidate build.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-30",
        "tags": ["qa", "release"],
        "board_id": "seed-board-2",
    },
    #  Q4 Marketing Campaign — seed-board-3
    {
        "id": "seed-15",
        "title": "Define campaign audience",
        "description": "Finalize target audience segments and campaign targeting criteria.",
        "status": TaskStatus.DONE,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-04",
        "tags": ["strategy", "audience"],
        "board_id": "seed-board-3",
    },
    {
        "id": "seed-16",
        "title": "Approve campaign messaging",
        "description": "Review and approve the primary campaign messaging and supporting copy.",
        "status": TaskStatus.DONE,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-10",
        "tags": ["content", "review"],
        "board_id": "seed-board-3",
    },
    {
        "id": "seed-17",
        "title": "Design social media assets",
        "description": "Create campaign graphics for the planned social media placements.",
        "status": TaskStatus.IN_PROGRESS,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-21",
        "tags": ["design", "social"],
        "board_id": "seed-board-3",
    },
    {
        "id": "seed-18",
        "title": "Build campaign landing page",
        "description": "Implement the campaign landing page using the approved design and messaging.",
        "status": TaskStatus.IN_PROGRESS,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-23",
        "tags": ["web", "frontend"],
        "board_id": "seed-board-3",
    },
    {
        "id": "seed-19",
        "title": "Configure email sequence",
        "description": "Build and configure the automated email sequence for campaign leads.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-25",
        "tags": ["email", "automation"],
        "board_id": "seed-board-3",
    },
    {
        "id": "seed-20",
        "title": "Set up conversion tracking",
        "description": "Configure campaign conversion events and verify analytics reporting.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-27",
        "tags": ["analytics", "tracking"],
        "board_id": "seed-board-3",
    },
    {
        "id": "seed-21",
        "title": "Schedule launch-day posts",
        "description": "Prepare and schedule approved social content for campaign launch day.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.LOW,
        "due_date": "2026-09-30",
        "tags": ["social", "launch"],
        "board_id": "seed-board-3",
    },
    #  Customer Portal — seed-board-4
    {
        "id": "seed-22",
        "title": "Map account management flow",
        "description": "Document the customer journey through the primary account management workflows.",
        "status": TaskStatus.DONE,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-05",
        "tags": ["ux", "product"],
        "board_id": "seed-board-4",
    },
    {
        "id": "seed-23",
        "title": "Build account dashboard",
        "description": "Implement the main dashboard with account details and recent activity.",
        "status": TaskStatus.DONE,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-11",
        "tags": ["frontend", "dashboard"],
        "board_id": "seed-board-4",
    },
    {
        "id": "seed-24",
        "title": "Add billing history view",
        "description": "Display customer invoices and previous payments in the account portal.",
        "status": TaskStatus.IN_PROGRESS,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-20",
        "tags": ["billing", "frontend"],
        "board_id": "seed-board-4",
    },
    {
        "id": "seed-25",
        "title": "Implement notification preferences",
        "description": "Allow customers to manage email and account notification preferences.",
        "status": TaskStatus.IN_PROGRESS,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-23",
        "tags": ["settings", "engineering"],
        "board_id": "seed-board-4",
    },
    {
        "id": "seed-26",
        "title": "Add support request form",
        "description": "Create a form for customers to submit support requests from the portal.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.MEDIUM,
        "due_date": "2026-09-25",
        "tags": ["support", "forms"],
        "board_id": "seed-board-4",
    },
    {
        "id": "seed-27",
        "title": "Handle expired sessions",
        "description": "Redirect customers safely when their authenticated portal session expires.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.HIGH,
        "due_date": "2026-09-27",
        "tags": ["auth", "bug"],
        "board_id": "seed-board-4",
    },
    {
        "id": "seed-28",
        "title": "Update customer help content",
        "description": "Refresh help content to reflect the new portal workflows and account features.",
        "status": TaskStatus.TODO,
        "priority": TaskPriority.LOW,
        "due_date": "2026-09-30",
        "tags": ["content", "support"],
        "board_id": "seed-board-4",
    },
]


def seed_data() -> None:
    session = SessionLocal()

    try:
        for board_data in seed_boards:
            new_board = Board(
                id=board_data["id"],
                title=board_data["title"],
                description=board_data["description"],
                icon=board_data["icon"],
            )
            session.merge(new_board)

        for task_data in seed_tasks:
            new_task = Task(
                id=task_data["id"],
                title=task_data["title"],
                description=task_data["description"],
                status=task_data["status"],
                priority=task_data["priority"],
                due_date=task_data["due_date"],
                tags=task_data["tags"],
                board_id=task_data["board_id"],
            )
            session.merge(new_task)

        session.commit()
        print("Database seeded successfully.")
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


if __name__ == "__main__":
    seed_data()
