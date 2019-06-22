import * as _ from "lodash";
import * as React from "react";

interface DashboardProps {
  accessToken: string;
}

interface DashboardState {
  genres: Array<string>;
}

export default class Dashboard extends React.Component<DashboardProps> {
  componentDidMount() {
    const { accessToken } = this.props;
    const request = new Request("/api/callback", {
      method: "POST",
      body: JSON.stringify({ accessToken }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let genres: Array<Array<string>> = [];

    fetch(request).then(() => {
      fetch("/api/top_artists")
        .then(response => {
          return response.json();
        })
        .then(function(data) {
          data.map((d: { genres: Array<string> }) => {
            return genres.push(d.genres);
          });
        })
        .then(() => {
          this.setState({ genres: _.flatten(genres) });
        });
    });
  }

  render() {
    return <div />;
  }
}
