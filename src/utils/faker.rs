use std::char;
use std::sync::{Arc, Mutex};

pub struct Faker {
    pub lock: Mutex<()>, // 使用 Mutex 进行锁定
}

impl Faker {
    // 生成 ID
    pub fn gen_id(&self, id: u32, with_prefix: Option<bool>) -> String {
        let _guard = self.lock.lock().unwrap(); // 获取锁
        let with_prefix = with_prefix.unwrap_or(true);

        let s = self.to_base31(id); // 将 ID 转换为 base 31 字符串
        let reversed = self.reverse(&s); // 反转字符串

        let mut padded_reversed = reversed;
        if padded_reversed.len() < 6 {
            padded_reversed.push_str(&"0".repeat(6 - padded_reversed.len()));
        }

        if with_prefix {
            format!("0x{}", padded_reversed)
        } else {
            padded_reversed
        }
    }

    // 恢复 ID
    pub fn recover_id(&self, id: &str) -> u32 {
        let _guard = self.lock.lock().unwrap(); // 获取锁
        if id.is_empty() {
            return 0;
        }

        let trimmed = id.trim_start_matches("0x"); // 去掉前缀 "0x"
        let reversed = self.reverse(trimmed);
        self.from_base31(&reversed).unwrap_or(0) // 处理 base 31 转换
    }

    // 将整数转换为 base 31 字符串
    pub fn to_base31(&self, mut num: u32) -> String {
        let mut result = String::new();
        while num > 0 {
            let rem = num % 31;
            result.push(self.int_to_base31_char(rem));
            num /= 31;
        }
        if result.is_empty() {
            result.push('0');
        }
        result
    }

    // 从 base 31 字符串转换回整数
    pub fn from_base31(&self, s: &str) -> Result<u32, std::num::ParseIntError> {
        let mut result = 0;
        for (i, ch) in s.chars().rev().enumerate() {
            let value = self.base31_char_to_int(ch) as u32;
            result += value * 31u32.pow(i as u32);
        }
        Ok(result)
    }

    // 辅助函数，将整数转换为 base 31 的字符
    pub fn int_to_base31_char(&self, value: u32) -> char {
        if value < 10 {
            char::from_digit(value, 10).unwrap()
        } else {
            (b'a' + (value - 10) as u8) as char
        }
    }

    // 辅助函数，将 base 31 字符转换为整数
    pub fn base31_char_to_int(&self, ch: char) -> u32 {
        if ch.is_digit(10) {
            ch.to_digit(10).unwrap()
        } else {
            (ch as u32) - ('a' as u32) + 10
        }
    }

    // 反转字符串
    pub fn reverse(&self, s: &str) -> String {
        s.chars().rev().collect()
    }
}

// 创建 Faker 实例
pub fn new_faker() -> Arc<Faker> {
    Arc::new(Faker {
        lock: Mutex::new(()), // 初始化 Mutex
    })
}
