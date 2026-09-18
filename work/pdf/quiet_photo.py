"""Neutralize photographed LEDs without replacing the original instrument artwork."""
from PIL import Image, ImageDraw, ImageFilter

def quiet_photo(path):
    im = Image.open(path).convert('RGBA')
    scale = im.width / 1600
    # Clone the unlit LED and surrounding button material from the same row.
    # Coordinates refer to the 1600px reference, not the cropped presentation.
    for x, y, donor_x, donor_y in [
        (251,821,177,821),(325,821,177,821),(399,821,473,821),
        (770,821,696,821),(845,821,918,821),
        (1216,746,1290,746),(696,969,770,969),(993,969,919,969),
    ]:
        r=round(11*scale)
        box=(round(donor_x*scale)-r,round(donor_y*scale)-r,
             round(donor_x*scale)+r+1,round(donor_y*scale)+r+1)
        patch=im.crop(box)
        mask=Image.new('L',patch.size,0)
        ImageDraw.Draw(mask).ellipse((1,1,2*r-1,2*r-1),fill=255)
        mask=mask.filter(ImageFilter.GaussianBlur(scale*.8))
        im.paste(patch,(round(x*scale)-r,round(y*scale)-r),mask)
    return im
