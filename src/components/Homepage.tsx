import {
  ArrowRight,
  CircleCheck,
  CheckSquare,
  Flag,
  Grid2X2,
  Plus,
  Sparkles,
} from 'lucide-react';
import PlantStickyNotes from '../assets/Homepage/PlantStickyNotes.png';

import KanbanStickyNotes from '../assets/Homepage/KanbanStickyNotes.png';

import '../styles/pages/Homepage.css';
import { Link } from 'react-router';

function Homepage() {
  const features = [
    {
      title: 'Multiple Boards',
      description:
        'Create boards for different projects and areas of your life.',
      Icon: Grid2X2,
      color: 'purple',
    },
    {
      title: 'Organize Tasks',
      description:
        'Use status, priority, and due dates to keep everything on track.',
      Icon: CheckSquare,
      color: 'green',
    },
    {
      title: 'Focus & Prioritize',
      description: 'See what matters most and make progress with confidence.',
      Icon: Flag,
      color: 'yellow',
    },
    {
      title: 'Get Things Done',
      description: 'A clean, visual workflow that helps you move forward.',
      Icon: CircleCheck,
      color: 'pink',
    },
  ];

  return (
    <div>
      <div className="home-page-container">
        <div className="hero">
          <svg
            className="hero-bottom-left-wave"
            viewBox="0 0 500 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 82 C78 89 81 234 233 248 C332 257 393 269 500 300 H0 Z"
              fill="#c7d2fe"
            />
          </svg>

          <svg
            className="hero-right-blob"
            viewBox="0 0 1000 560"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M250 0
              C185 45 124 44 62 102
              C4 156 -15 248 40 312
              C91 369 176 360 272 407
              C393 468 470 477 610 467
              C759 456 853 505 1000 560
              L1000 0
              Z"
              fill="#c7d2fe"
            />
          </svg>

          <div className="hero-content">
            <div className="left-hero">
              <img src={PlantStickyNotes} className="plant-sticky-img" />
            </div>
            <div className="middle-hero">
              <div className="hero-info-container">
                <div className="badge primary">
                  <Sparkles className="icon sm sparkles-icon" />
                  <div>Stay orgainized, one board at a time</div>
                </div>
                <div className="title-block">
                  <div className="title-main">Welcome to</div>
                  <div className="title-accent">Sticky Situation</div>
                </div>
                <div className="description">
                  A clean and simple Kanban app to orgainize your work, your
                  projects and everything in between.
                </div>
                <div className="button-container">
                  <Link to="/boards" className="link-button primary">
                    <Grid2X2 />
                    <div>View Boards</div>
                  </Link>
                  <Link to="/boards/new" className="link-button outline">
                    <Plus />
                    <div>Create Board</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="right-hero">
              <img src={KanbanStickyNotes} className="kanban-board-img" />
            </div>
          </div>
        </div>
        <div className="features-section">
          <div className="features-text">
            <div className="features-title">
              Everything you need to stay organized
            </div>
            <div className="features-subtitle">Simple. Flexible. Powerful.</div>
          </div>
          <div className="features-list">
            {features.map((feature, idx) => {
              const IconName = feature.Icon;
              return (
                <div key={idx} className="feature-list-item">
                  <div
                    className={`feature-item-icon icon-container accent-${feature.color}`}
                  >
                    <IconName className={`icon xl accent-${feature.color}`} />
                  </div>
                  <div className="feature-item-text-container">
                    <div className="feature-item-title">{feature.title}</div>
                    <div className="feature-item-description">
                      {feature.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="badge primary features-create-pill">
            <Sparkles className="icon sm sparkles-icon" />
            <div className="features-create-text-primary">
              Ready to get started?
            </div>
            <Link to="/boards">
              <div>View your boards</div>
            </Link>
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
