import * as React from 'react';

import { IconWithText } from '../Shared/PageElements';
import { Add } from './Add';
import { ArrowRightCircle } from './ArrowRightCircle';
import { ArrowUpCircle } from './ArrowUpCircle';
import { ChevronRight } from './ChevronRight';
import { ChevronLeft } from './ChevronLeft';
import { CircleWithDot } from './CircleWithDot';
import { EyeOff } from './EyeOff';
import { Eye } from './Eye';
import { ToggleLeft } from './ToggleLeft';
import { ArrowDownCircle } from './ArrowDownCircle';
import { CheckMark } from './CheckMark';
import { ChevronDown } from './ChevronDown';
import { ChevronUp } from './ChevronUp';
import { Circle } from './Circle';
import { Close } from './Close';
import { Edit } from './Edit';
import { Error } from './Error';
import { Info } from './Info';
import { List } from './List';
import { Menu } from './Menu';
import { MessageCircle } from './MessageCircle';
import { Printer } from './Printer';
import { Remove } from './Remove';
import { Success } from './Success';
import { ToggleRight } from './ToggleRight';
import { Warning } from './Warning';
import { Download } from './Download';
import { Send } from './Send';
import { Star } from './Star';

import * as Social from './Social';

const styles = require('./icons.module.css');

export const IconList: React.FC<{}> = () => (
    <div className={styles.IconList}>
        <IconWithText iconOnLeft text="Add" Icon={Add} />
        <IconWithText iconOnLeft text="ArrowDownCircle" Icon={ArrowDownCircle} />
        <IconWithText iconOnLeft text="ArrowRightCircle" Icon={ArrowRightCircle} />
        <IconWithText iconOnLeft text="ArrowUpCircle" Icon={ArrowUpCircle} />
        <IconWithText iconOnLeft text="CheckMark" Icon={CheckMark} />
        <IconWithText iconOnLeft text="ChevronDown" Icon={ChevronDown} />
        <IconWithText iconOnLeft text="ChevronLeft" Icon={ChevronLeft} />
        <IconWithText iconOnLeft text="ChevronRight" Icon={ChevronRight} />
        <IconWithText iconOnLeft text="ChevronUp" Icon={ChevronUp} />
        <IconWithText iconOnLeft text="Circle" Icon={Circle} />
        <IconWithText iconOnLeft text="CircleWithDot" Icon={CircleWithDot} />
        <IconWithText iconOnLeft text="Close" Icon={Close} />
        <IconWithText iconOnLeft text="Download" Icon={Download} />
        <IconWithText iconOnLeft text="Edit" Icon={Edit} />
        <IconWithText iconOnLeft text="Error" Icon={Error} />
        <IconWithText iconOnLeft text="Eye" Icon={Eye} />
        <IconWithText iconOnLeft text="EyeOff" Icon={EyeOff} />
        <IconWithText iconOnLeft text="Info" Icon={Info} />
        <IconWithText iconOnLeft text="List" Icon={List} />
        <IconWithText iconOnLeft text="Menu" Icon={Menu} />
        <IconWithText iconOnLeft text="MessageCircle" Icon={MessageCircle} />
        <IconWithText iconOnLeft text="Remove" Icon={Remove} />
        <IconWithText iconOnLeft text="Success" Icon={Success} />
        <IconWithText iconOnLeft text="ToggleLeft" Icon={ToggleLeft} />
        <IconWithText iconOnLeft text="ToggleRight" Icon={ToggleRight} />
        <IconWithText iconOnLeft text="Warning" Icon={Warning} />
        <IconWithText iconOnLeft text="Printer" Icon={Printer} />
        <IconWithText iconOnLeft text="Send" Icon={Send} />
        <IconWithText iconOnLeft text="Star" Icon={Star} />
        <IconWithText iconOnLeft text="Social: Facebook" Icon={Social.Facebook} />
        <IconWithText iconOnLeft text="Social: Instagram" Icon={Social.Instagram} />
        <IconWithText iconOnLeft text="Social: LinkedIn" Icon={Social.LinkedIn} />
        <IconWithText iconOnLeft text="Social: Twitter" Icon={Social.Twitter} />
    </div>
);
