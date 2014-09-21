import gdata.spreadsheet.service

'''Usage

pi install gdata
GMAIL=Something; GPASS=Somethingelse

import sys
sys.path.append('/Users/chbrown/github/sandbox/python')

import spreadsheets

spreadsheets.get('house-expenses')

'''

# redis_client = redis.StrictRedis()


ALPHABET = ['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
def excel_column_name(index):
    return ALPHABET[index // 26] + ALPHABET[index % 26 + 1]


# def get(title, flush=False):
#     '''Returns a javascript native object: a list of dicts'''
#     key = 'goog.spreadsheet:%s' % title
#     cached_json = redis_client.get(key)
#     if not cached_json or flush:
#         fresh = list(fetch_from_google(title))
#         cached_json = json.dumps(fresh)
#         redis_client.set(key, cached_json)
#         redis_client.expire(key, 3600)
#     return json.loads(cached_json)


def fetch(title, email, password):
    svc = gdata.spreadsheet.service.SpreadsheetsService()
    svc.email = email
    svc.password = password
    svc.source = 'LIST'
    svc.ProgrammaticLogin()

    query = gdata.spreadsheet.service.DocumentQuery()
    query['title'] = title
    query['title-exact'] = 'true'

    feed = svc.GetSpreadsheetsFeed(query=query)
    spreadsheet_id = feed.entry[0].id.text.rsplit('/', 1)[1]
    feed = svc.GetWorksheetsFeed(spreadsheet_id)
    worksheet_id = feed.entry[0].id.text.rsplit('/', 1)[1]

    # list_feed = svc.GetListFeed(spreadsheet_id, worksheet_id)
    # list_feed.title.text = 'clips_nro4.txt'
    # list_feed.author[0].name.text = 'audiere'
    # list_feed.author[0].email.text = 'audiere@gmail.com'
    # list_feed.total_results.text = 107
    # for row in list_feed.entry:
        # row = dict()
        # for key, val in raw_row.custom.items():
        #     row[key] = (val.text or '').strip()
        # yield dict(zipped(headers, [cell.title.text for cell in row])

    cells_feed = svc.GetCellsFeed(spreadsheet_id, worksheet_id)
    values = dict((cell.title.text, cell.content.text) for cell in cells_feed.entry)
    columns = map(excel_column_name, range(int(cells_feed.col_count.text)))

    def row_cells(row_index):
        return [values.get('%s%d' % (column, row_index + 1), '') for column in columns]

    headers = row_cells(0)
    for row in range(1, int(cells_feed.row_count.text)):
        yield dict(zip(headers, row_cells(row)))
