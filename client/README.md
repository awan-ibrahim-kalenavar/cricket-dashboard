# Cricket Live Score Dashboard

A comprehensive React.js web application for displaying live cricket scores, match details, team information, and player statistics with beautiful Material UI components and interactive charts.

## Features

- **Live Matches**: Real-time cricket match scores with automatic refresh
- **Match Scorecards**: Detailed batting and bowling statistics
- **Teams**: Complete team information with squad details
- **Player Statistics**: Comprehensive player stats with interactive charts
- **Responsive Design**: Mobile-friendly interface using Material UI
- **Real-time Updates**: Auto-refresh functionality for live matches

## Tech Stack

### Frontend
- **React.js** - UI framework
- **JavaScript** - Programming language
- **Material UI** - UI component library
- **React Router DOM** - Navigation
- **Chart.js** - Data visualization
- **React Chart.js 2** - React wrapper for Chart.js
- **Axios** - HTTP client for API requests

### Development Tools
- **VS Code** - Code editor
- **GitHub** - Version control

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Application header
│   ├── Navbar.js       # Navigation bar
│   ├── MatchCard.js    # Match display card
│   └── ScoreBoard.js   # Scorecard display component
├── pages/              # Page components
│   ├── Home.js         # Home page
│   ├── LiveMatches.js  # Live matches page
│   ├── Teams.js        # Teams page
│   ├── Players.js      # Player statistics page
│   └── ScoreCard.js    # Match scorecard page
├── services/           # API services
│   └── cricketApi.js   # Cricket API integration
├── hooks/              # Custom React hooks
│   └── useMatches.js   # Match data management
├── utils/              # Utility functions
│   └── helper.js       # Helper functions
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ipl-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## API Integration

The application integrates with the Cricket API (https://cricketapi.com) for fetching live match data, team information, and player statistics. The API service is located in `src/services/cricketApi.js`.

### API Endpoints
- `GET /matches/live` - Fetch live matches
- `GET /matches/{id}/scorecard` - Get match scorecard
- `GET /teams` - List all teams
- `GET /teams/{id}` - Get team details
- `GET /players` - List all players
- `GET /players/{id}/stats` - Get player statistics

## Components

### Header Component
- Displays application title with cricket icons
- Responsive design with Material UI styling

### Navbar Component
- Navigation menu with icons
- Active route highlighting
- Sticky positioning for easy access

### MatchCard Component
- Displays match information
- Live match indicators
- Score display with overs
- Interactive hover effects

### ScoreBoard Component
- Detailed batting statistics
- Bowling figures
- Responsive table layout
- Status indicators

## Pages

### Home Page
- Welcome message and feature overview
- Navigation cards for different sections
- Call-to-action buttons

### Live Matches Page
- Real-time match updates
- Auto-refresh every 30 seconds
- Live and completed match sections
- Manual refresh option

### Teams Page
- Team cards with logos
- Team statistics
- Squad information
- Interactive team selection

### Players Page
- Player list with filtering
- Detailed statistics
- Interactive charts (Bar and Line)
- Season performance tracking

### ScoreCard Page
- Match summary
- Detailed batting and bowling stats
- Navigation back to matches
- Responsive layout

## Custom Hooks

### useMatches Hook
- Manages match data state
- Auto-refresh functionality
- Filtering capabilities
- Error handling

## Utility Functions

### Helper Functions
- Data formatting utilities
- Strike rate calculations
- Economy rate calculations
- Team logo mapping
- Data validation

## Styling

The application uses Material UI for consistent styling with:
- Custom theme configuration
- Responsive design principles
- Component style overrides
- Color scheme matching cricket theme

## Charts

Player statistics are visualized using Chart.js with:
- Bar charts for season performance
- Line charts for recent form
- Responsive and interactive charts
- Custom styling and colors

## Development

### Available Scripts
- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Code Structure
- Component-based architecture
- Separation of concerns
- Reusable components
- Custom hooks for state management
- Utility functions for common operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under the MIT License.

## Future Enhancements

- Real-time WebSocket integration
- Match predictions
- User authentication
- Favorite teams/players
- Match highlights
- Fantasy cricket integration
- Mobile app development

## Support

For any issues or questions, please open an issue on the GitHub repository.
