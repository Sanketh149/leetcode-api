const query = `
  query getUserProfile($username: String!) {
    recentAcSubmissionList(username: $username) {
      titleSlug
      title
    }
  }
`;

//fetching the data
exports.leetcode = (req, res) => {
  let user = req.params.id;
  fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query: query, variables: { username: user } }),
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.errors) {
        res.send(data);
      } else {
        res.send(data.data);
      }
    })
    .catch((err) => {
      console.error("Error", err);
      res.send(err);
    });
};
