const juice = require("juice");

const BlockEmail = () => {
  const html = `
  <style>
  div{
    color:white;
  }
  .card-block{
    width: fit-content;
    height: 100%;
    padding: 10px 10px;
    margin: 5px 50px;
    border-radius: 8px;
    background-color: #f7f7f7;
  }
  .hola{
    background-color: grey;
    text-align:right;
  }
  .chao{
    background-color: #45A14A;
    text-align:left;
  }
 
  </style>
  <div class="card-block">
  <div class="hola">Hola!</div>
  <div class="chao">Chao!</div>
  </div>`;
  return juice(html);
};

exports.TestEmail = () => {
  const html = `
  <style>
    .emailNewsletter {
      width: 80%;
      margin: 30px 100px;
      padding: 20px;
      background: linear-gradient(to bottom, #45A14A 0%,#45A14A 30%,white 30%,white 100%);
    }
    table {
      text-align:center
    }
  </style>

  <div class='emailNewsletter'>
    <table>
      <tr>
        <td>John</td>
      </tr>
    </table>
    <table>
      <colgroup span="4" class="columns"></colgroup>
        <tr>
          <th>Countries</th>
          <th>Capitals</th>
          <th>Population</th>
          <th>Language</th>
        </tr>
        <tr>
          <td>USA</td>
          <td>Washington D.C.</td>
          <td>309 million</td>
          <td>English</td>
        </tr>
        <tr>
          <td>Sweden</td>
          <td>Stockholm</td>
          <td>9 million</td>
          <td>Swedish</td>
        </tr>
  </div>
`;

  return juice(html);
};
